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




module.exports = {
  createService,
  createSubServiceWithDetails,
};
