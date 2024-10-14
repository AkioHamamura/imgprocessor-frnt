import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"; // ES Modules import
// const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3"); // CommonJS import
import "dotenv/config";
const client = new S3Client();
const input = { // PutObjectRequest
    Body: "MULTIPLE_TYPES_ACCEPTED", // see \@smithy/types -> StreamingBlobPayloadInputTypes
    Bucket: "s3-imageprocess506", // required
    Key: "test2" // required
};
const command = new PutObjectCommand(input);
const response = await client.send(command);
// { // PutObjectOutput
//   Expiration: "STRING_VALUE",
//   ETag: "STRING_VALUE",
//   ChecksumCRC32: "STRING_VALUE",
//   ChecksumCRC32C: "STRING_VALUE",
//   ChecksumSHA1: "STRING_VALUE",
//   ChecksumSHA256: "STRING_VALUE",
//   ServerSideEncryption: "AES256" || "aws:kms" || "aws:kms:dsse",
//   VersionId: "STRING_VALUE",
//   SSECustomerAlgorithm: "STRING_VALUE",
//   SSECustomerKeyMD5: "STRING_VALUE",
//   SSEKMSKeyId: "STRING_VALUE",
//   SSEKMSEncryptionContext: "STRING_VALUE",
//   BucketKeyEnabled: true || false,
//   RequestCharged: "requester",
// };

