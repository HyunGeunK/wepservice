const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: "",
});

async function createImage(){
    const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: "a cute cat",
        n: 1,
        size: "1024x1024",
    });
    image_url = response.data[0].url;
    console.log(image_url); 
}
createImage();