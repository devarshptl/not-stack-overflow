export default {
  errorFunction: (errorObject, callback) => {
    const errObj = {...Object(errorObject)};
    let errorMessage = null;
    if (errObj.clientErrors && errObj.clientErrors.length !== 0) {
      errorMessage = errObj.clientErrors[0].message;
    } else if (errObj.graphQLErrors && errObj.graphQLErrors.length !== 0) {
      errorMessage = JSON.parse(errObj.graphQLErrors[0].message).error[0].message;
    } else if (errorObject.networkError) {
      errorMessage = {...errObj.networkError}.result.errors[0].message;
    } else {
      errorMessage ={...Object(errorObject.message)};
    }
    console.log(errorMessage);
    callback(errorMessage);
  },
};


