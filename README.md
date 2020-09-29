# xperience-zapier-cli

A native Zapier application to integrate Xperience 13 websites with Zapier and thousands of its available applications.

## Index

- [Zapier integrations](#zapier-integrations)
- [Installation](#installing-the-packages-in-xperience)
    - [Using without installing](#using-the-integration-without-nuget-packages)
- [Xperience integrations](#xperience-integrations)
- [Creating a webhook](#creating-a-webhook)


## Zapier integrations

### Triggers

- __Catch Xperience Webhook__: Triggers when a POST request is sent from your Xperience CMS/MVC application. Requires the [NuGet packages](#installing-the-packages-in-xperience) to be installed on the project.

### Actions

- __Create New Object__: Creates a new object of selected type in your Xperience application, assigned to the website specified when authenticating the Zapier integration.
- __Create New Page__: Creates a new page in the content tree of the selected page type, on the website specified when authenticating the Zapier integration.

## Installing the packages in Xperience

> :gear: These NuGet packages make it easy to manage webhooks in the Xperience interface, and automatically submit POSTs to Zapier when data is modified. However, if you'd like to use the Zapier application without installing the NuGet packages, skip to [Using the integration without NuGet packages](#using-the-integration-without-nuget-packages)

1. In your Xperience administration project, open the NuGet Package Manager and install the __Xperience.Zapier__ and __Xperience.Zapier.Common__ packages

2. After installation, go to the __Sites application__ and import the package located at _~\CMS\App_Data\CMSModules\Xperience.Zapier\Xperience.Zapier.zip_

3. If you are using the MVC development model and would like to trigger Zaps when object events are fired from the MVC project, install the __Xperience.Zapier.Common__ package in the MVC project

## Using the integration without NuGet packages

1. Create a new Zap on http://zapier.com using the __Webhooks by Zapier__ app and the __Catch hook__ action

1. Copy the __Custom Webhook URL__ in the trigger

1. In Xperience, determine when and how the Zapier trigger should be fired. For example, it could be within a [custom workflow action](https://docs.kentico.com/k12sp/configuring-kentico/configuring-the-environment-for-content-editors/configuring-workflows/designing-advanced-workflows/creating-custom-action-workflow-steps), a [custom marketing automation action](https://docs.kentico.com/k12sp/on-line-marketing-features/configuring-and-customizing-your-on-line-marketing-features/configuring-marketing-automation/developing-custom-marketing-automation-actions), or an [event handler](https://docs.kentico.com/k12sp/custom-development/handling-global-events)

1. In your code, use [`HttpClient`](https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httpclient?view=netcore-3.1) to send a POST request to the __Custom Webhook URL__ with a body that contains the information you need in the Zap

## Xperience integrations

After installing the NuGet packages in the Xperience application, you can find a new __Zapier__ module under the __Configuration__ menu. This will list the created webhooks and allow you to fine-tune or disable them if necessary. You _do not_ need to create webhooks in Xperience unless you are setting them up manually- Zapier will create them automatically!

The import package provided by the NuGet packages also contains a custom [workflow action](https://docs.kentico.com/k12sp/configuring-kentico/configuring-the-environment-for-content-editors/configuring-workflows/designing-advanced-workflows/creating-custom-action-workflow-steps) and custom [marketing automation](https://docs.kentico.com/k12sp/on-line-marketing-features/configuring-and-customizing-your-on-line-marketing-features/configuring-marketing-automation/developing-custom-marketing-automation-actions) action to trigger Zaps.

## Creating a webhook

1. Use [this link](https://zapier.com/developer/public-invite/116683/ea4735596915584316f39c38181796d1/) to gain access to the private Kentico Xperience Zapier application

2. [Enable the REST service](https://docs.kentico.com/k12sp/integrating-3rd-party-systems/kentico-rest-service/configuring-the-rest-service) in Xperience

3. Create a new Zap on http://zapier.com which should fire when an action occurs in Kentico

4. In __step 1__ of the Zap, use the __Kentico Xperience__ app and the __Catch Xperience Webhook__ event

![selectapp](/assets/selectapp.png)

5. Click __Continue__. On the next step, you need to provide the URL of your Xperience administration website, and the credentials of a user on the site with sufficient [REST](https://docs.kentico.com/k12sp/integrating-3rd-party-systems/kentico-rest-service) permissions

> :globe_with_meridians: If you are running Xperience locally, you can use [ngrok](https://ngrok.com/) to make it accessible. Use the `-host-header` parameter with your site's domain to avoid licensing errors: `ngrok http -host-header=myawesomesite.com 80`

6. After authenticating, select the object type and action that should trigger this Zap. Create a name for the webhook that will appear in the Xperience administration, following Xperience's code name conventions:

![triggerconfig](/assets/triggerconfig.png)

7. On the next step, click __Test trigger__ button. You should shortly see _“We found a request!”_ with sample data from your Xperience project for the selected object type.

8. Set up the rest of your Zap actions. For testing purposes, you could just use a __Code by Zapier__ action with the default configuration

9. __Turn on__ the Zap! When the Zap is turned on, the webhook is automatically created in your Xperience project and you can go to the __Zapier__ application to view it. Perform the action that triggers the Zap, then check __Task history__ in Zapier to see the results
