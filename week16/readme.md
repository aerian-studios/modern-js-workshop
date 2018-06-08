# Get familiar with react and CSS modules

The current list works something like a webpage in that clicking on the list
animals changes which is shown, so let us make it work a bit more like that.

Turn the animal list into a ‘navigation side bar” Add some extra ‘pages’ Make
the side bar slide in and out.

Need to alter some of the ideas to make them more generic - currently AnimalList
is the list of ‘pages’, change animal to content, etc Make a new fixture. We
will use the same image for thumbnail and full image Include our new data into
App and change state, etc to use it.

state = { content: pages, selectedContent: pages[0], lightboxContent: null };
loadAnimals = async () => { const response = await fetch(
"//api.jsonbin.io/b/5afc5c68c2e3344ccd96b97c/1" ); const animals = await
response.json(); const content = [...pages, ...animals];

       if (content.length) {
           this.setState({ content, selectedContent: content[0] });
       }

};

4.  What if we want some html in there? We definitely DON’T want to do that if
    the content is not in our control, so we need to distinguish between types
    of content. Talk about how to do this. Set a new field in the JSON, and look
    for that + dangerouslySetInnerHTML={{ __html: content.description }}

Now there is the ability to setup different pages.

5.  In order to make the “navigation” a sliding element, it suddenly needs state
