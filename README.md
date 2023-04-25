# AWS Polish Backend

This README file provides an overview of the AWS Polish Backend project, which focuses on using Multer middleware to handle multipart/form-data. The project explores different alternatives of the upload variable and how it applies the callbacked function.

## Key Takeaways

- Multer is a middleware that handles multipart/form-data.
- The upload variable is consistent in all alternatives and takes in an object with storage and filter props among others.
- The storage prop is an object that takes in a storage engine that is configured to our liking. The storage engine can be multerS3 or multer.diskStorage.
- multerS3 storage engine makes it easier to connect to the S3 bucket.
- multer.diskStorage engine helps us connect to the local disk storage.

After uploading a file, the file object is added to our req object and has the following significant properties depending on the storage engine selected:

1. fieldname: The name of the field in the form that the file was uploaded from.
2. originalname: The name of the file on the user's computer.
3. encoding: The encoding type of the file.
4. mimetype: The mime type of the file.
5. destination: The folder to which the file has been saved. (DiskStorage)
6. filename: The name of the file within the destination. (DiskStorage)
7. path: The full path to the uploaded file. (DiskStorage)
8. size: The size of the file in bytes.
9. buffer: A Buffer of the entire file. (MemoryStorage)
10. location: The location of the uploaded file. (S3Storage)
11. key: The key of the uploaded file on S3. (S3Storage)
12. acl: The ACL of the uploaded file on S3. (S3Storage)
13. bucket: The bucket of the uploaded file on S3. (S3Storage)
14. etag: The etag of the uploaded file on S3. (S3Storage)
15. contentType: The content type of the uploaded file on S3. (S3Storage)
16. contentDisposition: The content disposition of the uploaded file on S3. (S3Storage)
17. storageClass: The storage class of the uploaded file on S3. (S3Storage)
18. serverSideEncryption: The server-side encryption of the uploaded file on S3. (S3Storage)
19. metadata: The metadata of the uploaded file on S3. (S3Storage)
20. uploadedAt: The uploaded at date of the uploaded file on S3. (S3Storage)
21. url: The URL of the uploaded file on S3. (S3Storage)
22. expires: The expires date of the uploaded file on S3. (S3Storage)
