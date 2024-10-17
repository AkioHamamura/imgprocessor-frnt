//A library to handle function related to AWS s3 pre-signed url and upload
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";


//Receives a file, uploads it to an S3 bucket and returns the checksum of the file as well as the response from the S3 bucket
export const uploadFileAwsSdk = async (file) => {
    const config = {
        region: "us-east-1",
            credentials: fromCognitoIdentityPool({
            clientConfig: { region: "us-east-1" },
            identityPoolId: "us-east-1:d3ebea42-49d8-47ad-a26d-10f9b96ec13b",
        })};

    const checksum = await getFileSha256(file);
    const client = new S3Client(config);
    const input = {
        Bucket: 's3-imageprocess506',
        Key: `input/${checksum}`,
        Body: file,
        ContentType: file.type}
    const command = new PutObjectCommand(input);
    const response = await client.send(command);
    return { response, checksum };
}

export const fetchFile = async (checksum) => {
    if (!checksum) return;
    const config = {
        region: "us-east-1",
        credentials: fromCognitoIdentityPool({
            clientConfig: { region: "us-east-1" },
            identityPoolId: "us-east-1:d3ebea42-49d8-47ad-a26d-10f9b96ec13b",
        })};
    const client = new S3Client(config);
    const input = {
        Bucket: 's3-imageprocess506',
        //Key: `output/${checksum}`
        Key: `output/${checksum}`
    }
    const command = new GetObjectCommand(input);
    const response = await client.send(command);
    //Transform the response to a blob
    return response;

}

//Receives a file, returns a SHA-256 checksum of it
async function getFileSha256(file){
    const fileBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", fileBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}