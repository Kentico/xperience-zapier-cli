# Zapier CLI integration

A native Zapier application to integrate Xperience 13 websites with Zapier and thousands of its available applications. This integration allows you to create Zaps which trigger when actions are taken in your Xperience application, and does not require a paid Zapier account.

## Zapier integrations

You can read more about the native Zapier integration here: https://zapier.com/apps/kentico-xperience/integrations.

### Triggers

- __Catch Xperience Webhook__: Triggers when a POST request is sent from your Xperience Portal Engine/.NET Core application. Requires the [custom module](#installing-the-custom-module) to be installed on the project.

### Actions

- __Create New Object__: Creates a new object of selected type in your Xperience application.
- __Create New Page__: Creates a new page in the content tree of the selected page type. See [the example](#zapier-setup) for details.
- __Update Page__: Updates an existing page in the content tree based on the NodeAliasPath. See [Updating pages](#updating-pages).
- __Update Object__: Updates an existing site or global object. See [Updating objects](#updating-objects).
- __Move to Next Step__: Moves a page under workflow to the next step.

### Searches

- __Find Page__: Search for a page in your content tree based on a SQL query

## Installing the custom module

> :gear: __Optional!__

 This custom module makes it easy to manage webhooks in the Xperience interface, and automatically submit POSTs to Zapier when data is modified in the CMS. However, you can still use this integration's actions (like __Create New Page__) without installing the module.
 
If you'd rather manage everything in Zapier, and you'd like to trigger Zaps without installing the custom module, skip to [Triggering Zaps without the custom module](#triggering-zaps-without-the-custom-module). To install and use the custom module, follow the [instructions in that repository](https://github.com/kentico-ericd/xperience-zapier#installing). 

## Enabling REST

The native Zapier application uses Xperience's REST endpoint to authenticate requests and obtain data from your site. REST must be enabled and configured properly to use the [Zapier integrations](#zapier-integrations), regardless of whether you are using the custom module or not.

[Follow our instructions](https://docs.xperience.io/k12sp/integrating-3rd-party-systems/kentico-rest-service/configuring-the-rest-service) for enabling the REST service, including all server configuration, Xperience settings, and the `runAllManagedModulesForAllRequests` attribute. Consider also enabling the __Allow sensitive fields for administrators__ setting if you'd like to get/set sensitive fields (e.g. _UserPassword_).


## Triggering Zaps without the custom module

1. Create a new Zap on http://zapier.com using the __Webhooks by Zapier__ app and the __Catch hook__ action

1. Copy the __Custom Webhook URL__ in the trigger

1. In Xperience, determine when and how the Zapier trigger should be fired. For example, it could be within a [custom workflow action](https://docs.kentico.com/k12sp/configuring-kentico/configuring-the-environment-for-content-editors/configuring-workflows/designing-advanced-workflows/creating-custom-action-workflow-steps), a [custom marketing automation action](https://docs.kentico.com/k12sp/on-line-marketing-features/configuring-and-customizing-your-on-line-marketing-features/configuring-marketing-automation/developing-custom-marketing-automation-actions), or an [event handler](https://docs.kentico.com/k12sp/custom-development/handling-global-events)

1. In your code, use [`HttpClient`](https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httpclient?view=netcore-3.1) to send a POST request to the __Custom Webhook URL__ with a body that contains the information you need in the Zap

## Creating a webhook

> :warning: These steps assume you have installed the custom module

1. Create a new Zap on http://zapier.com which should fire when an action occurs in Kentico

2. In __step 1__ of the Zap, use the __Kentico Xperience__ app and the __Catch Xperience Webhook__ event

![selectapp](/assets/selectapp.png)

3. Click __Continue__. On the next step, you need to provide the URL of your Xperience administration website, and the credentials of a user on the site with sufficient [REST](https://docs.kentico.com/k12sp/integrating-3rd-party-systems/kentico-rest-service) permissions

> :globe_with_meridians: If you are running Xperience locally, you can use [ngrok](https://ngrok.com/) to make it accessible.

4. After authenticating, select the object type and action that should trigger this Zap. Create a name for the webhook that will appear in the Xperience administration, following Xperience's code name conventions:

![triggerconfig](/assets/triggerconfig.png)

5. On the next step, click __Test trigger__ button. You should shortly see _“We found a request!”_ with sample data from your Xperience project for the selected object type.

6. Set up the rest of your Zap actions. For testing purposes, you could just use a __Code by Zapier__ action with the default configuration

7. __Turn on__ the Zap! When the Zap is turned on, the webhook is automatically created in your Xperience project and you can go to the __Zapier__ application to view it. Perform the action that triggers the Zap, then check __Task history__ in Zapier to see the results

## Updating pages

With the __Update Page__ action, you can update standard page fields and custom fields of existing pages in your content tree. You only need to supply the NodeAliasPath of the page and (optionally) the culture version to update.

![update page](/assets/updatepage.png)

The format of the JSON is the same as described in our [REST documentation](https://docs.xperience.io/integrating-3rd-party-systems/xperience-rest-service/manipulating-data-using-rest/managing-pages-using-rest#ManagingpagesusingREST-Updatingexistingpages). You can update as many or as few fields as you'd like- existing data not included in the JSON body are not modified.

## Updating objects

Using the __Update Object__ action, you can update an existing site or global object. For example, settings keys can apply globally to all sites, but each site can also have its own key value. To update a site's custom settings key, you could follow this example:

![updateobject](/assets/updateobject.png)

## Example - Synchronizing Google Calendar events with Xperience

### Xperience setup

1. Create a page type for displaying events in your Xperience site

![eventtype](/assets/eventtype.png)

2. On the __Allowed types__ tab, set the __Allowed parent page types__ to `CMS.Folder` (or any other page type you want to create events under)

3. Add the parent page to the content tree

![parentpage](/assets/parentpage.png)

### Zapier setup

1. Create a new Zap using the __Google Calendar__ app and __New Event__ trigger. Connect to your Google account and choose the calendar you wish to synchronize

![calendartrigger](/assets/calendartrigger.png)

2. In the next step, choose the __Kentico Xperience__ app and __Create New Page__ action

![xperienceaction](/assets/xperienceaction.png)

3. In the __Customize Create New Page__ menu, use the drop-downs to select the dynamic fields from the trigger. For example, for the page type's _StartDate_ field, choose _Event Begins_ from the trigger.  
Make sure to set the __Parent Page__ path to the page created in step 3 of the [Xperience setup](#xperience-setup)

![customfields](/assets/customfields.png)

4. Turn on the Zap! When you create a new event in Google Calendar, you should see a new page in the Xperience content tree. You could also create another Zap using the __Event Cancelled__ trigger in Google Calendar, to delete the page in Xperience when the event is deleted.

## Compatibility

The Zapier integration represented by this repository should work with all versions of Kentico Xperience (custom module excluded), but has only been tested with Kentico Xperience 13 websites.

## Feedback & Contributing

Check out the [contributing](https://github.com/kentico-ericd/xperience-zapier-cli/blob/master/CONTRIBUTING.md) page to see the best places to file issues, start discussions, and begin contributing.

## License

The repository is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
