const firebaseConfig = require("../config/firebase-config");

//destructuring properties
const { dbFireStore, Timestamp } = firebaseConfig;

const COLLECTION = "services";
const SUB_SERVICES = "subServices";
const SUB_SERVICE_DETAILS = "subServiceDetails";

// create a service
const createService = async (req, res) => {
  try {
    const data = {
      serviceName: req.body.serviceName,
      serviceCode: req.body.serviceCode,
      availableBranches: req.body.availableBranches || [],
      description: req.body.description,
    };
    const response = await dbFireStore.collection(COLLECTION).add(data);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
};

const createSubServiceWithDetails = async (req, res) => {
  try {
    const serviceRef = dbFireStore.collection(COLLECTION).doc(req.params.id);
    const serviceSnapshot = await serviceRef.get();

    if (serviceSnapshot.exists) {
      // Add subservices
      const subServicesRef = serviceRef.collection(SUB_SERVICES);
      const reqBody = req.body;
      let data = {
        subServiceName: reqBody.subServiceName,
        subServiceCode: reqBody.subServiceCode,
      };
      let subServiceResponse = await subServicesRef.add(data);

      // Add subservice details
      if (reqBody.details && reqBody.details.length > 0) {
        const detailsRef = subServicesRef
          .doc(subServiceResponse.id)
          .collection(SUB_SERVICE_DETAILS);

        for (let detail of reqBody.details) {
          let detailData = {
            detailName: detail.detailName,
            duration: detail.duration,
            price: detail.price,
          };
          await detailsRef.add(detailData);
          console.log(
            `Detail added for Subservice ID: ${subServiceResponse.id}`
          );
        }
      }

      res.status(200).send("Successfully created");
    } else {
      res.status(404).send("Service not found");
    }
  } catch (error) {
    res.status(400).send({ Error: `${error}` });
  }
};

// get all services names
const getAllServicesNames = async (req, res, serviceId) => {
  try {
    const servicesRef = dbFireStore.collection(COLLECTION);
    const snapshot = await servicesRef.get();

    if (snapshot.empty) {
      res.status(404).send("No services found");
    } else {
      const serviceNames = snapshot.docs.map((doc) => {
        let data = doc.data();
        return {
          id: doc.id,
          serviceName: data.serviceName,
        };
      });
      res.status(200).send(serviceNames);
    }
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
};

// get Sub service details
const getAllSubServicesWithDetails = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const serviceRef = dbFireStore.collection(COLLECTION).doc(serviceId);
    const serviceSnapshot = await serviceRef.get();

    if (!serviceSnapshot.exists) {
      res.status(404).send("Service not found");
      return;
    }

    const subservicesRef = serviceRef.collection(SUB_SERVICES);
    const subservicesSnapshot = await subservicesRef.get();

    if (subservicesSnapshot.empty) {
      res.status(404).send("No sub-services found for the given service");
    } else {
      const subServicesData = [];

      subservicesSnapshot.forEach((subserviceDoc) => {
        const subserviceDetailsRef = subservicesRef
          .doc(subserviceDoc.id)
          .collection(SUB_SERVICE_DETAILS);
        const subserviceData = {
          subServiceName: subserviceDoc.data().subServiceName,
          subServiceCode: subserviceDoc.data().subServiceCode,
          details: [],
        };

        subserviceDetailsRef.get().then((detailsSnapshot) => {
          detailsSnapshot.forEach((detailDoc) => {
            subserviceData.details.push({
              detailName: detailDoc.data().detailName,
              duration: detailDoc.data().duration,
              price: detailDoc.data().price,
            });
          });

          subServicesData.push(subserviceData);

          // Check if this is the last subservice to send the response
          if (subServicesData.length === subservicesSnapshot.size) {
            res.status(200).send(subServicesData);
          }
        });
      });
    }
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
};

// get sub services with IDs for Admin
const getAllSubServicesWithIDs = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const serviceRef = dbFireStore.collection(COLLECTION).doc(serviceId);
    const serviceSnapshot = await serviceRef.get();

    if (!serviceSnapshot.exists) {
      res.status(404).send("Service not found");
      return;
    }

    const subservicesRef = serviceRef.collection(SUB_SERVICES);
    const subservicesSnapshot = await subservicesRef.get();

    if (subservicesSnapshot.empty) {
      res.status(404).send("No sub-services found for the given service");
    } else {
      const subServicesData = [];

      for (const subserviceDoc of subservicesSnapshot.docs) {
        const subserviceDetailsRef = subservicesRef
          .doc(subserviceDoc.id)
          .collection(SUB_SERVICE_DETAILS);
        const subserviceData = {
          subServiceId: subserviceDoc.id, // Add the ID of the sub-service
          subServiceName: subserviceDoc.data().subServiceName,
          subServiceCode: subserviceDoc.data().subServiceCode,
          details: [],
        };

        const detailsSnapshot = await subserviceDetailsRef.get();

        detailsSnapshot.forEach((detailDoc) => {
          subserviceData.details.push({
            detailId: detailDoc.id, // Add the ID of the detail
            detailName: detailDoc.data().detailName,
            duration: detailDoc.data().duration,
            price: detailDoc.data().price,
          });
        });

        subServicesData.push(subserviceData);
      }

      res.status(200).send(subServicesData);
    }
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
};

// Update sub-service by ID
const updateSubServiceById = async (req, res) => {
  try {
    const serviceId = req.params.serviceId;
    const subServiceId = req.params.subServiceId;
    const serviceRef = dbFireStore.collection(COLLECTION).doc(serviceId);
    const subServicesRef = serviceRef.collection(SUB_SERVICES);
    const subServiceRef = subServicesRef.doc(subServiceId);

    const existingData = (await subServiceRef.get()).data();

    // Merge existing data with the fields provided in the request
    const updateData = {
      ...existingData,
      subServiceName: req.body.subServiceName || existingData.subServiceName,
      subServiceCode: req.body.subServiceCode || existingData.subServiceCode,
      // Add other fields you want to update
    };

    await subServiceRef.update(updateData);
    res.status(200).send("Sub-service updated successfully");
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
};

// Update sub-service detail by ID
const updateSubServiceDetailById = async (req, res) => {
  try {
    const serviceId = req.params.serviceId;
    const subServiceId = req.params.subServiceId;
    const detailId = req.params.detailId;
    const serviceRef = dbFireStore.collection(COLLECTION).doc(serviceId);
    const subServicesRef = serviceRef.collection(SUB_SERVICES);
    const subServiceRef = subServicesRef.doc(subServiceId);
    const detailsRef = subServiceRef.collection(SUB_SERVICE_DETAILS);
    const detailRef = detailsRef.doc(detailId);

    const existingData = (await detailRef.get()).data();

    // Merge existing data with the fields provided in the request
    const updateData = {
      ...existingData,
      detailName: req.body.detailName || existingData.detailName,
      duration: req.body.duration || existingData.duration,
      price: req.body.price || existingData.price,
      // Add other fields you want to update
    };

    await detailRef.update(updateData);
    res.status(200).send("Sub-service detail updated successfully");
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
};

module.exports = {
  createService,
  createSubServiceWithDetails,
  getAllServicesNames,
  getAllSubServicesWithDetails,
  getAllSubServicesWithIDs,
  updateSubServiceById,
  updateSubServiceDetailById,
};
