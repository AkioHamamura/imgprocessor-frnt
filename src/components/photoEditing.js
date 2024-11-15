//Library for the photo editing functions and procedures

//Overall the idea is this:
    //1. User uploads a photo though the website and will receive a checksum of the photo and a response from the S3 bucket
    //2. After receiving the checksum, the website will automatically use the checksum and an operation to tell the API what to do with the photo and which photo, the checksum is used to identify the photo
    //3. The API will then use the checksum to find the photo in the S3 bucket and apply the operation to the photo, then upload the edited photo back to the output folder in the s3 bucket
    //4. After receiving a 200 response from the API indicating that the operation was successful, the website will then fetch the edited photo from the output folder in the s3 bucket and display it to the user
    //5. The user can then download the edited photo if they wish
//This is the library that will handle the photo editing functions and procedures

//This function will call the API to apply a filter to the photo
export const applyFilter = async (checksum) => {
    //Call the API and wait for a response for at most 30 seconds
    const response = await fetch(`https://zrmulzpv9b.execute-api.us-east-1.amazonaws.com/prod/process-image?file=${checksum}.png`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    console.log(response);
    return response;
}
export const removeBackground = async(checksum) =>{
    //API endpoint: https://6sxg45y2rh.execute-api.us-east-1.amazonaws.com//process?File_name={checksum}
    return await fetch(`https://6sxg45y2rh.execute-api.us-east-1.amazonaws.com/process?File_name=${checksum}.png`)


}
