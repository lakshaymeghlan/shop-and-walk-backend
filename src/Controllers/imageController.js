import user from '../Schema/userDetails'


export const postImage = async (req, res) => {
    console.log(req.file)

  const { id: _id } = req.params;


  var img = {
    data: req.file.buffer,
    contentType: req.file.mimetype,
  };
  res.json(img)

};



export const getImage = async (req, res) => {
    const { id: _id } = req.params;
    try {
      const users = await user.findById(_id)
      const pic = await users.profilePicture;
      res.status(200).json(pic);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };