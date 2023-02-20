exports.multerConfig = (multer) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/fileUpload/");
    },
    filename: (req, file, cb) => {
      cb(null, "img-" + new Date().toISOString() + "-" + file.originalname);
    },
  });

  const fileFilter = (req, file, cb) => {
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
      ? cb(null, true)
      : cb(null, false);
  };

  return multer({
    storage: storage,
    limits: { fileSize: 1048576 },
    fileFilter: fileFilter,
  });
};
