const response = async (res, callBack) => {
    try {
        callBack();
    } 
    catch (error) {
        response.status(500).json({message: error.message});
    }
}

module.exports = response;