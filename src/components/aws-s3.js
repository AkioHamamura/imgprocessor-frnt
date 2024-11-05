//A library to handle function related to AWS s3 pre-signed url and upload
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";

const region = "us-east-1";
const identityPoolId = "us-east-1:d3ebea42-49d8-47ad-a26d-10f9b96ec13b";
const bucketName = 's3-imageprocess506';

const getClientConfig = () => ({
    region,
    credentials: fromCognitoIdentityPool({
        clientConfig: { region },
        identityPoolId,}),
});

const getFileSha256 = async (file) => {
    const fileBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", fileBuffer);
    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
};

export const uploadFileAwsSdk = async (file) => {
    const checksum = await getFileSha256(file);

    if (await checkFile(checksum))
        return { response: { status: 200 }, checksum }; //If file already exists, skips upload process
    else{
        const client = new S3Client(getClientConfig());
        const input = {
            Bucket: bucketName,
            Key: `input/${checksum}.png` ,
            Body: file,
            ContentType: file.type,
            Metadata: { 'Content-Type': 'image/png' },};

        const command = new PutObjectCommand(input);
        const response = await client.send(command);
        return { response, checksum };
    }
};

export const fetchFile = async (checksum) => {
    if (!checksum) return;
    const client = new S3Client(getClientConfig());
    const input = {
        Bucket: bucketName,
        Key: `output/${checksum}.png`,};

    const command = new GetObjectCommand(input);
    return await client.send(command);
};

export const checkFile = async (checksum) => {
    if (!checksum) return false;
    const client = new S3Client(getClientConfig());
    const input = {
        Bucket: bucketName,
        Key: `input/${checksum}.png`,};

    const command = new GetObjectCommand(input);
    try {
        console.log(await client.send(command));
        console.log("File exists");
        return true;
    }
    catch {
        console.log("File does not exist");
        return false;}
};