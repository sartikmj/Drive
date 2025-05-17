const cloudinary = require('cloudinary').v2;

async function cloudinaryUpload(localPath) {

	// Configuration
	cloudinary.config({
		cloud_name: 'dgmmzmhng',
		api_key: '868371758884171',
		api_secret: 'amqrBnP5_DypXoNgFz4siTIfOJE' // Never expose this in public code!
	});

	try {
		const uploadResult = await cloudinary.uploader.upload(localPath, {
			resource_type: 'auto',
		});

		return uploadResult.secure_url; // Return the secure URL of the uploaded image
	}
	catch (error) {
		console.error(error);
		throw error;
	}
}

module.exports = cloudinaryUpload;
