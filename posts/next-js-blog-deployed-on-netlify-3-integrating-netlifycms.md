---
layout: blog
title: "Next.js Blog Deployed on Netlify #3: Integrating NetlifyCMS "
description: "In the finale of this 3 part series, learn how to integrate
  NetlifyCMS with your existing Next.js project. "
date: 2021-02-09T22:29:09.363Z
thumbnail: /images/uploads/next-netlify.png
code:
  code: a
---
Finally, we're at the final step in creating a full-fledged blog with Next.js and Netlify. Up to this point, we have create a Next application capable of reading and display markdown files and deployed it onto Netlify. The final step is to integrate NetlifyCMS with the application. 

Essentially, our goal by the end of this article is to be able to navigate to "yourwebsite.com/admin" and be able to use NetlifyCMS user interface to create and publish articles. Lets get started. 

## Configuration Files

To get started, we'll need to add two *very* important files to our existing project. Since this is a Next.js application, we'll need to work under the provided "/public" directory, since it will be the root directory of the deployed application. Under "/public,' create a "/admin" directory. In there, we'll need two files: 

1. index.html - Go ahead and fill in this file with a basic HTML template as you normally would. This file will be responsible for the user interface created when you navigate to "yourwebsite.com/admin."
2. config.yml

Now, in the index.html file, you'll need to add the following script to the body of your file: 

```html
<body>
  <script src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"></script>
<body/>
```

### Configuring Your CMS with YAML

Your "config.yml" file will be critical to the functionality of the CMS. This is where any and all configuration goes. In this tutorial, I'll provide the basics to get started. If you haven't worked with .yml files before, just know that indentation is key!

Now, add the following to your config.yml file: 

```yaml
backend:
  name: git-gateway
  branch: master 
media_folder: "public/images"
public_folder: "/images"
 
```

Let's break that down: 

1. The `backend` tells NetlifyCMS which backend protocol to follow. Since we're using Github in this example, it will use a provided "git gateway" API and modify changes to the master branch.
2. The `media_folder` designates a directory location to store media, such as images. It is important to know that this is relative to the root of your entire project. You can change the `images` directory to anything you wish or even create a subdirectory - if it doesn't already exist, it will be created. Since this is a Next application, you'll want for it to be in the "public" directory, however. 
3. The `public_folder` will tell NetlifyCMS how to link to your media. That is, let's say you wish to include an image in your article; NetlifyCMS needs to know how to create an accurate url to link the image. Important: this is relative to your "/public" directory and the beginning "/" is necessary. In the example above, images will have the url of "yourwebsite.com/images/image1.png."

### Adding Collections to Your CMS

A collection in NetlifyCMS is simply as it may sound - it's a grouping of *types* of content. Since the theme of this tutorial series is blogging, we'll need to create a "blog" collection in our "config.yml."

```yaml
backend:
  name: git-gateway
  branch: master 
media_folder: "public/images/uploads"
public_folder: "/images/uploads"
collections: 
  - name: "blog"
    label: "Blog"
    folder: "posts" 
    create: true 
    slug: "{{slug}}"
    fields: 
      - {label: "Layout", name: "layout", widget: "hidden", default: "blog"}
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Description", name: "description", widget: "string"}
      - {label: "Publish Date", name: "date", widget: "datetime"}
      - {label: "Featured Image", name: "thumbnail", widget: "image"}
      - {label: "Body", name: "body", widget: "markdown"}
```

As you might be able to tell, we added one collection named "blog." In addition, we: 

1. Labeled the collection as "Blog," which is what the CMS UI will label it. 
2. Specified a `folder` for the content to be stored. This is relative to the root of your project. 
3. Set `create` to `true` which allows for the creation of new content. 
4. Specified a `slug` template for the filename structure. In this case, if we title a post "Example Blog," NetlifyCMS will create the following url-safe filename: "example-blog.md." You can customize the slug further by adding the date to it as such: 

   ```yaml
   slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
   ```

   This will create a filename such as "2021-01-01-example-blog.md."
5. We specified the required `fields`. The data we added in our `fields` section is what NetlifyCMS calls "widgets." To learn more about the different types of widgets, visit <https://www.netlifycms.org/docs/widgets>. 

   In the example above, we utilize the "string" widget to create a title and description for each post, the datetime widget to timestamp each new blog post, the image widget to create a thumbnail for each post, and the markdown widget to create a rich text editor we can use to type up our blogs. 

After the above is done and changed to your liking, we can move onto our deployed site on Netlify.

## Configuring Your Netlify Website

Under your management console in Netlify, 

1. Click **Enable Identity** Service under **Settings > Identity**.
2. Under **Registration Preferences**, you can choose between **Open** or **Invite Only**. For the purposes of this tutorial, you can choose **Open**, which allows anyone to access to your CMS. Later on, you can change it to  **Invite Only**.
3.