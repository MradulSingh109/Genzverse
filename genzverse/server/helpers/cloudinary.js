



const { v2: cloudinary } = require('cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: "dxcpirkgn",
    api_key: "777659889334359",
    api_secret: "cscvGM60OKskFWm-U1Ka5QInsXM"
})

const storage = new multer.memoryStorage();

async function imageUploadUtils(file){
    const result = await cloudinary.uploader.upload(file, {
        resource_type: 'auto'
    });
    return result;
}

const upload = multer({storage})

module.exports = {upload, imageUploadUtils}