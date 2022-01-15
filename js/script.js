'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this; 


  /* remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */

  clickedElement.classList.add('active');

  /* remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */

  const clickedHrefArticle = clickedElement.getAttribute("href");


  /* find the correct article using the selector (value of 'href' attribute) */

  const correctArticle = document.querySelector(clickedHrefArticle);


  /* add class 'active' to the correct article */

  correctArticle.classList.add('active');
}


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector ='.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';


function generateTitleLinks(customSelector = '') {

  /* remove all links in left table  */
    
  const listTitles = document.querySelector(optTitleListSelector);
  listTitles.innerHTML = '';
    
  /* for each link in article  */

  const listArticles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';

  for (let article of listArticles){

    /* get article id  */
    const articleId = article.getAttribute("id");


    /* get title and save in const  */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;


    /* based on above save link to html  */
    const htmlLink = '<li><a href="#'+articleId+'" class="active"><span>'+articleTitle+'</span></a></li>';

    /* insert html to table  */
    html = html + htmlLink;
  
  }
    
  listTitles.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
    
}
    
generateTitleLinks();

function generateTags(){
  /* find all articles */

  const allArticles = document.querySelectorAll(optArticleSelector);
  

  /* START LOOP: for every article: */

  for (let article of allArticles){

    /* find tags wrapper */
    const wrapper = article.querySelector(optArticleTagsSelector);


    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const dataTags = article.getAttribute('data-tags');

    /* split tags into array */
    const tagsArr = dataTags.split(' ');

    /* START LOOP: for each tag */
    for (let tag of tagsArr){

      /* generate HTML of the link */
      const linkHtml = '<li><a href="#tag-'+tag+'">'+tag+'</a></li>';

      /* add generated code to html variable */
      html = html + linkHtml;

    /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    wrapper.innerHTML = html;

  /* END LOOP: for every article: */
  }
}

generateTags();


function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this; 

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute("href");

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags){
    /* remove class active */
    activeTag.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const hrefTags = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let hrefTag of hrefTags){
    /* add class active */
    hrefTag.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');

}



function addClickListenersToTags(){
  /* find all links to tags */
  const links = document.querySelectorAll('.post .list a');

  /* START LOOP: for each link */
  for (let link of links){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}




function generateAuthors(){

  /* find all articles */

  const allArticles = document.querySelectorAll(optArticleSelector);
  

  /* START LOOP: for every article: */

  for (let article of allArticles){

    /* find tags wrapper AUTHOR */
    const wrapper = article.querySelector(optArticleAuthorSelector);

    /* get AUTHOR from data-author attribute */
    const dataAuthor = article.getAttribute('data-author');

    /* insert HTML of all the links into the AUTHOR wrapper */
    wrapper.innerHTML = 'by &nbsp;<a href="#author-'+dataAuthor+'">'+dataAuthor+'</a>';

  /* END LOOP: for every article: */
  }

}

generateAuthors();

function authorClickHandler (event) {

  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this; 

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute("href");
  
  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');

  /* find all tag links with class active */
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
  console.log(activeAuthors);

  /* START LOOP: for each active tag link */
  for (let activeAuthor of activeAuthors){
    /* remove class active */
    activeAuthor.classList.remove('active');
  /* END LOOP: for each active tag link */
  }

  /* find all author links with "href" attribute equal to the "href" constant */
  const hrefAuthors = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */

  for (let hrefAuthor of hrefAuthors){
    /* add class active */
    hrefAuthor.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');

}

function addClickListenersToAuthors () {

  const links = document.querySelectorAll('.post .post-author a');

  for (let link of links){
    link.addEventListener('click', authorClickHandler);
  }

}
addClickListenersToAuthors();

function calculaTagsParams(tags = {}) {

  const paramTags = [];

  for (let tag in tags)
    if (!paramTags.includes(tags[tag])){
      paramTags.push(tags[tag]);
    }
  const maxTag = Math.max.apply(Math, paramTags);
  const minTag = Math.min.apply(Math, paramTags);

  const result = {max: maxTag, min: minTag};

  return result;

}

function calculateTagClass (count, params){

  if (count == params['min']){
    return optCloudClassPrefix + '1';
  } else if (count == params['max']){
    return optCloudClassPrefix + '5';
  }

}

function generateTags(){
  /* [NEW] create a new variable allTags with an empty obejct */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles){

    /* find tags wrapper */
    const wrapperTag = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const tags = article.getAttribute('data-tags');
    

    /* split tags into array */
    const tagArray = tags.split(" ");

    /* START LOOP: for each tag */
    for (let tag of tagArray){

      /* generate HTML of the link */
      const linkHtml = '<li><a href="#tag-'+tag+'">'+tag+'</a></li>';

      /* add generated code to html variable */
      html = html + linkHtml;

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag] ++; 
      }
    
    }
    /* END LOOP: for each tag */
    
    /* insert HTML of all the links into the tags wrapper */
    wrapperTag.innerHTML = html;
  /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  const tagsParams = calculaTagsParams(allTags);
  console.log("tags Param: ",  tagsParams);
  let allTagsHTML = '';

  for (let tag in allTags){
    allTagsHTML += '<li><a href="#tag-'+ tag + '"class="'+calculateTagClass(allTags[tag], tagsParams)+'">'+tag+'</a>(' + allTags[tag] + ')</li>';
  }

  tagList.innerHTML = allTagsHTML;
}

generateTags();
addClickListenersToTags();