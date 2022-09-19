// import image from "../Schema/image";


// const uploadImage = async (req, res) => {
//     res.send("file upload")
// };


app.post('/api/image-upload', upload.single('image'),(req, res) => {

    const image = req.image;
  
      res.send(apiResponse({message: 'File uploaded successfully.', image}));
  
  });

export default {
    postImage,
};
