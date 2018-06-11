# Get familiar with react and CSS modules

The current stripy.xyz has a list of animals that change the content when you
click them; which is something like a navigation, so...

1.  let us make it work a bit more like that and turn the animal list into a
    "navigation side bar" Add some extra "pages".
2.  Make the side bar toggle visible on smaller screens.

The following notes will be about the thinking and method that I'd use to get to
that state.

## Methododical methodology

Frist, looking at our code in `App` and our naming, we can see that there are a
lot of assumptions that we are only interested in animals, which is correct
based on our previous brief, but now we need to alter some of the ideas to make
them more generic - `AnimalList` can become something like `NavList`, change
`animal` references can be changed to `content`, etc.

```javascript
// App.js
import React, { Component } from "react";
import { AnimalDetail } from "./AnimalDetail/AnimalDetail"; // this stays the same
import { NavList } from "./NavList/NavList"; // this needs to be more generic
import { Lightbox } from "./Lightbox/Lightbox";

import pages from "../fixtures/pages.json";
import { PageDetail } from "./PageDetail/PageDetail"; // this becomes more generic

import "../theme/theme.css";
import styles from "./App.css";

export default class App extends Component {
    state = {
        content: pages, // more generic
        selectedContent: pages[0], // more generic
        lightboxAnimal: null, // stays the same
    };

    componentDidMount() {
        this.loadContent();
    }

    loadContent = async () => {
        const response = await fetch(
            "//api.jsonbin.io/b/5afc5c68c2e3344ccd96b97c/1"
        );
        const animals = await response.json();
        const content = pages.concat(animals); // combine pages with animals

        if (content.length) {
            this.setState({ content, selectedContent: content[0] });
        }
    };

    chooseAnimal = (animal) => {
        this.setState({ selectedContent: animal });
    };

    openLightbox = () =>
        this.setState({
            lightboxAnimal: this.state.selectedContent,
        });

    closeLightbox = () => this.setState({ lightboxAnimal: null });

    chooseRenderComponent(selectedContent) {
        let comp = null;

        switch (selectedContent.isPage) {
            case true:
                comp = <PageDetail content={selectedContent} />;
                break;
            default:
                comp = (
                    <AnimalDetail
                        animal={selectedContent}
                        onOpenImage={this.openLightbox}
                    />
                );
        }

        return comp;
    }

    render() {
        const { selectedContent, content, lightboxAnimal } = this.state;

        return (
            <div>
                <main className={styles.main}>
                    <div id="sidebar">
                        <NavList
                            content={content}
                            selectedContent={selectedContent}
                            onClick={this.chooseAnimal}
                        />
                    </div>
                    <div>{this.chooseRenderComponent(selectedContent)}</div>
                </main>
                <Lightbox
                    visible={!!lightboxAnimal}
                    image={lightboxAnimal && lightboxAnimal.image_full}
                    lowRes={lightboxAnimal && lightboxAnimal.image_thumb}
                    onClick={this.closeLightbox}
                />
            </div>
        );
    }
}
```

So there are some elements renamed, while it doesn't change any functionality,
it does change the way we think (and an outside developer will think) about what
each of the elements is and does.

You may have noticed that we added a new fixture. In the interests of limiting
the scope of each change, we will try to match as much as possibile the naming
and structure of the existing animal pages. If it doesn't look feasible, we can
always come back and modify it. So, we will use the same image for the full
image and most of the other data looks fine or we can ignore it.

```javascript
[
    {
        uuid: "about-us",
        type: "about-us",
        isPage: true,
        common_name: "About Stripey",
        description:
            '<p>Stripes is the ultimate fansite for the appreciation of all things stripey.</p><p>Our aim is to enlighten, entertain and enquire about all things stripey&hellip; but especially about our stripey friends of the animal world and how we are impacting them.</p><p><a href="#">Some place</a></p>',
        image_full:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Equus_quagga_burchellii_-_Etosha%2C_2014.jpg/1920px-Equus_quagga_burchellii_-_Etosha%2C_2014.jpg",
    },
];
```

We have included a couple of new fields, that won't break our current API and
removed some other fields that we don't need...

Include our new data into `App` and change state and the components that are
interested in it to use the new shape of data.

```javascript
// We can now use the first element of our pages array in our default state because we know that it is local data
state = { content: pages, selectedContent: pages[0], lightboxContent: null };

// still load the animals data via fetch, but concatenate that result with our local pages to make our local content state
loadContent = async () => {
    const response = await fetch(
        "//api.jsonbin.io/b/5afc5c68c2e3344ccd96b97c/1"
    );
    const animals = await response.json();
    const content = pages.concat(animals); // combine pages with animals

    if (content.length) {
        this.setState({ content, selectedContent: content[0] });
    }
};
```

What if we want some html in there? You can see we've put some in our fixture,
but it is being output exaclty as it is input in the content; how do we output
that string as HTML?

Well firstly, we definitely _DON’T_ want to do that if the content is not our
content and not validated, so we need to distinguish between content that comes
from the API (not our content) and the content we created for pages (our
validated content). Once we have that we can choose to use a completely
different component to display the different types of content. We set a new
field in the JSON, `isPage` for this purpose and also placed another `type`
field as a hint that we might have many different content components.

To actually display the HTML we use the purposefully named method
`dangerouslySetInnerHTML={{ __html: content.description }}`

```javascript
const PageDetail = ({ content }) => {
    return (
        content && (
            <section>
                <h1>{content.common_name}</h1>
                <h2>{content.latin_name}</h2>
                {content.image_full && (
                    <img className={styles.img} src={content.image_full} />
                )}

                <div
                    dangerouslySetInnerHTML={{ __html: content.description }}
                />
            </section>
        )
    );
};
export default PageDetail;
```

Now there is the ability to setup different pages.

## Toggling navigation

We talked about what it meant to have a toggle for displaying the navigation; it
soon became clear because we talked about the navigation being in a visible
'state', etc. We talked about where this state should be, what needs to know
about this state? We decided that for now only the navigation needed to know if
it was showing or hiding...

So we refactored our `NavList` component so that it was a class rather than a
stateless functional component.

```javascript
export class NavList extends React.Component {
    state = {
        active: false,
    };

    toggle = () => {
        this.setState({ active: !this.state.active });
    };

    render() {
        return (
            <nav
                className={`${styles.Nav} ${this.state.active &&
                    styles.active}`}
                onClick={this.toggle}
            >
                <ul>
                    {this.props.content.map((navItem) => (
                        <ListItem
                            key={navItem.uuid}
                            selected={
                                navItem.uuid === this.props.selectedContent.uuid
                            }
                            onClick={() => this.props.onClick(navItem)}
                            label={navItem.common_name}
                            contextStyles={styles.NavItem}
                            online={this.props.online}
                        />
                    ))}
                </ul>
            </nav>
        );
    }
}
```

We added then added some state to represent the visibility and a toggle
function. We added the click to the base component so that it could be shown and
hidden by clicking anywhere within the component, even on the `NavList`
components.

One thing to note is that I didn't try to anything more than that in javascript,
though I certainly could have; the rest I delegated to CSS. CSS is very good at
hardware accellerated animation, at knowing screen size, at adding pseudo
elements, etc.

```css
.Nav {
    background-color: rgb(10, 50, 50);
    height: 100%;
    transition: transform 0.25s ease-out 0s;
    position: relative;
}

@media (max-width: 37.5em) {
    .Nav {
        transform: translateY(-100%);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }

    .Nav:focus,
    .active {
        transform: translateY(0);
    }

    .Nav::after {
        content: "=";
        font-size: 2em;
        line-height: 1em;
        padding: 8px;
        position: absolute;
        bottom: 0;
        right: 3px;
        background-color: rgb(10, 50, 50);
        color: #fff;
        border-radius: 3px;
        transform: translateY(90%);
    }
}

.NavItem {
    color: #fff;
}
```

I can easily make the state only apply for smaller screens with CSS and then
adding animations etc is just standard CSS (modules) workflow.

One thing to notice is that I pass the `.NavItem` style into my `ListItem` as
`contextualStyles` because the item has no concept of the fact that its
container has a black background. This fits with the idea of definition styles
as separate fro

Source code can be found in week 17.
