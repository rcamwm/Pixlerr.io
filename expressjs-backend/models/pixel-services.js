const mongoose = require("mongoose");
const pixelModel = require("./pixel");
const dotenv = require("dotenv");

dotenv.config();

mongoose.set("debug", true);

mongoose
	.connect(
		"mongodb+srv://" +
			process.env.MONGO_USER +
			":" +
			process.env.MONGO_PWD +
			"@" +
			process.env.MONGO_CLUSTER +
			"/" +
			process.env.MONGO_DB +
			"?retryWrites=true&w=majority",
  // "mongodb://localhost:27017/users",
  	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.catch((error) => console.log(error));

async function getPixels() {
	return await pixelModel.find();
}

async function updatePixel(id, newColor) {
	try {
		await pixelModel.findOne({ _id : id }).then(pixel => {
			pixel['color'] = newColor;
			pixel.save();
		})
		return true;
	}
	catch (error) {
		console.log(error);
		return false;
	}
}

async function clearCanvas()
{
		await pixelModel.deleteMany({});
		return true;
}

async function newCanvas(width, height)
{
	if(width === 0 || height === 0){
		return false;
	}
		for (let x = 0; x < width; x++) {
			for (let y = 0; y < height; y++) {
				let pixel = {
					color: "#fff",
					x: x,
					y: y
				};
				const pixelToAdd = new pixelModel(pixel);
				await pixelToAdd.save();
			}
		}
		return true;
}

exports.getPixels = getPixels;
exports.updatePixel = updatePixel;
exports.clearCanvas = clearCanvas;
exports.newCanvas = newCanvas;
