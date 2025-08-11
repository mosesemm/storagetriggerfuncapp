import { app, InvocationContext } from "@azure/functions";
import { emailService } from "../../uploads/email-service";

export async function storagetriggerfuncapp(blob: Buffer, context: InvocationContext): Promise<void> {
    context.log(`Storage blob function processed blob "${context.triggerMetadata.name}" with size ${blob.length} bytes`);
    const uploadData = {
        name: context.triggerMetadata.name, 
        description: "File uploaded via Azure Storage Trigger",
        url: `https://${context.triggerMetadata.storageAccountName}.blob.core.windows.net/${context.triggerMetadata.containerName}/${context.triggerMetadata.name}`,
        size: blob.length,
        createdAt: new Date().toISOString()
    };

    context.log(`Upload data: ${JSON.stringify(uploadData)}`);

    const emailData = {
        name: "New File Uploaded",
        email: "info@mashandiro.co.za",
        message: `A new file has been uploaded: ${uploadData.name}. You can access it at ${uploadData.url}.`
    };

    emailService.sendEmail(emailData)
        .then(() => context.log("Email sent successfully"))

}

app.storageBlob('storagetriggerfuncapp', {
    path: 'files/{name}',
    connection: '',
    handler: storagetriggerfuncapp
});
