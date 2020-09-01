# xperience-zapier-cli

## Installing the packages in Xperience
1. The NuGet packages are not currently on nuget.org, so you will need to download __Xperience.Zapier.x.y.z.nupkg__ and __Xperience.Zapier.Common.x.y.z.nupkg__ from

- https://github.com/kentico-ericd/xperience-zapier
- https://github.com/kentico-ericd/xperience-zapier-common

and place them in a local feed from NuGet Package Manager’s Package Sources menu:

![nuget](/nuget.png)

2. Install both NuGet packages in the CMS project. After installation, go to the Sites application and import the package located at _~\CMS\App_Data\CMSModules\Xperience.Zapier\Xperience.Zapier.zip_

3. If you are using the MVC development model and would like to trigger Zaps when object events are fired from the MVC project, install the __Xperience.Zapier.Common.x.y.z.nupkg__ package in the MVC project

## Creating a webhook

1. Use [this link](https://zapier.com/developer/public-invite/116028/13f7f2aec5d2a9709f3871cad53b3fe9/) to gain access to the private Kentico Xperience Zapier application

2. Create a new Zap on http://zapier.com which should fire when an action occurs in Kentico

3. In __step 1__ of the Zap, use the __Kentico Xperience__ app and the __Catch Xperience Webhook__ event.  
The Webhooks by Zapier app and the Catch Hook event works as well, but requires a Zapier Premium account

![selectapp](/selectapp.png)

4. Click __Continue__. On the next step, you need to provide the URL of your Xperience administration website, and the credentials of a user on the site

> **_NOTE:_**  If you are running Xperience locally, you can use [ngrok](https://ngrok.com/) to make it accessible. Be sure to add the ngrok URL to your site's __Domain Aliases__

5. Once you have authenticated, copy the __Webhook URL__

![zapurl](/zapurl.png)

6. In the Xperience administration, create a new webhook in the __Zapier__ application. Choose a name which describes what the webhook accomplishes, and choose an object type and event that will trigger the webhook.  
Copy the __Webhook URL__ from step 5 into the Zapier Url field

![newwebhook](/newwebhook.png)

 7. Save the webhook. You should see a `REGISTER` event in the __Event__ log if successful

 8. To test the webhook, perform the action that you specified. In the above example, you can go to the __Users__ application, edit a user, and click __Save__

 9. After performing the action, click the __Test trigger__ button on the Zap in Zapier. You should shortly see “We found a request!” with the data sent from Xperience

![testtrigger](/testtrigger.png)