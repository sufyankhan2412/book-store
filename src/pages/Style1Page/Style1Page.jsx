import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';  // Correct import

import {faFacebookSquare, faInstagram, faGithubSquare, faTwitterSquare, faYoutubeSquare, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import "./Style1Page.css";
function Style1Page() {
  // State for like button functionality
  const [likedButtons, setLikedButtons] = useState({});
  
  // Function to handle like button click
  const handleLikeClick = (id) => {
    setLikedButtons(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  // State for reply sections
  const [visibleReplies, setVisibleReplies] = useState({});
  
  // Function to toggle reply visibility
  const toggleReply = (replyId) => {
    setVisibleReplies(prev => ({
      ...prev,
      [replyId]: !prev[replyId]
    }));
  };

  return (
    <>
      <header className="main_header">
        <div className="d-flex justify-content-center align-items-center flex-column py-5">
          <h1 className="text-uppercase main_heading">BLOGS </h1>
          <p className="main_heading__para">Welcome to my <span className="text-capitalize bg-dark text-white py-2 px-3">world of blog</span></p>
        </div>
        <div className="main_header__div d-flex align-items-start justify-content-center flex-column shadow pl-5">
          <p>READIFY</p>
          <h2 className="animateWord">
            <span>Welcome</span> 
          </h2>
        
        </div>
      </header>

      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-10 col-lg-10 col-md-12 col-11 mx-auto my-5">
            <div className="row gx-5 mx-sm-auto">
              {/* left side of the blog */}
              <div className="col-lg-8 col-md-11 col-11 mx-auto">
                <div className="row gy-5">
                  {/* First blog post */}
                  <div className="col-12 card p-4 shadow blog_left__div">
                    <div className="d-flex justify-content-center align-items-center flex-column pt-3 pb-5">
                      <h1 className="text-uppercase">Best books in 2020</h1>
                      <p className="blog_title"><span className="font-weight-bold">Title description, </span>Aug 12, 2020</p>
                    </div>
                    <figure className="right_side_img mb-5">
                      <img 
                        src="data:image/jpeg;base64,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" 
                        alt="laptop" 
                        className="img-fluid shadow" 
                      />
                    </figure>
                    <p><span className="font-weight-bold">Thapa Technical</span> Welcomes, all of you to my world of blog. Some text about this blog entry. Fashion fashion and mauris neque quam, fermentum ut nisl vitae, convallis maximus nisl. Sed mattis nunc id lorem euismod placerat. Vivamus porttitor magna enim, ac accumsan tortor cursus at. Phasellus sed ultricies mi non congue ullam corper. Praesent tincidunt sedtellus ut rutrum. Sed vitae justo condimentum, porta lectus vitae, ultricies congue gravida diam non fringilla.</p>
                    <p>
                      Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
                    </p>
                    <div className="d-flex justify-content-between left_div_btns">
                      <div>
                        <button 
                          className={`left_div__like ${likedButtons['post1'] ? 'liked' : ''}`} 
                          onClick={() => handleLikeClick('post1')}
                        >
                          <FontAwesomeIcon icon={faThumbsUp} /> {likedButtons['post1'] ? '✓ Liked' : 'Like'}
                        </button>
                      </div>
                      <div>
                        <button 
                          className="left_div__reply" 
                          onClick={() => toggleReply('reply1')}
                        >
                          Replies <span className="bg-white text-dark p-2">1</span>
                        </button>
                      </div>
                    </div>
                    <div className={`replies ${visibleReplies['reply1'] ? 'thapa_show' : ''}`} id="reply1">
                      <div className="d-flex justify-content-start flex-row align-items-center card reply_card py-3">
                        <div className="reply_img mx-2 align-self-center">
                          <img src="data:image/jpeg;base64,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" alt="user" />
                        </div>
                        <div className="reply_text__left">
                          <p className="blog_title"><span className="font-weight-bold">Thapa, </span>Aug 12, 2020, 7:20 PM</p>
                          <p>Awesome, Bro I love your content.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Second blog post */}
                  <div className="col-12 card p-4 shadow blog_left__div">
                    <div className="d-flex justify-content-center align-items-center flex-column pt-3 pb-5">
                      <h1 className="text-uppercase">Title Heading</h1>
                      <p className="blog_title"><span className="font-weight-bold">Title description, </span>Aug 12, 2020</p>
                    </div>
                    <figure className="right_side_img mb-5">
                      <img 
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAMJIHF_doSU2yrpxp77FEV5EQOYm6jrh_HcncrtaCvdpAhvQilArAr0s&s" 
                        alt="tech image" 
                        className="img-fluid shadow" 
                      />
                    </figure>
                    <p><span className="font-weight-bold">Thapa Technical</span> Welcomes, all of you to my world of blog. Some text about this blog entry. Fashion fashion and mauris neque quam, fermentum ut nisl vitae, convallis maximus nisl. Sed mattis nunc id lorem euismod placerat. Vivamus porttitor magna enim, ac accumsan tortor cursus at. Phasellus sed ultricies mi non congue ullam corper. Praesent tincidunt sedtellus ut rutrum. Sed vitae justo condimentum, porta lectus vitae, ultricies congue gravida diam non fringilla.</p>
                    <p>
                      Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
                    </p>
                    <div className="d-flex justify-content-between left_div_btns">
                      <div>
                        <button 
                          className={`left_div__like ${likedButtons['post2'] ? 'liked' : ''}`} 
                          onClick={() => handleLikeClick('post2')}
                        >
                          <FontAwesomeIcon icon={faThumbsUp} /> {likedButtons['post2'] ? '✓ Liked' : 'Like'}
                        </button>
                      </div>
                      <div>
                        <button 
                          className="left_div__reply" 
                          onClick={() => toggleReply('reply2')}
                        >
                          Replies <span className="bg-white text-dark p-2">2</span>
                        </button>
                      </div>
                    </div>
                    <div className={`replies ${visibleReplies['reply2'] ? 'thapa_show' : ''}`} id="reply2">
                      <div className="d-flex justify-content-start flex-row align-items-center card reply_card py-3">
                        <div className="reply_img mx-2 align-self-center">
                          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSY27T67SdNf3WJXYXpyge3otT2E8ZH16L3Sf15i1r4GisQYtcIXUAi70&s" alt="user" />
                        </div>
                        <div className="reply_text__left">
                          <p className="blog_title"><span className="font-weight-bold">Vinod, </span>Aug 11, 2020, 7:20 PM</p>
                          <p>I really like the way you teach. Subscribed :)</p>
                        </div>
                      </div>
                      <div className="d-flex justify-content-start flex-row align-items-center card reply_card py-3">
                        <div className="reply_img mx-2 align-self-center">
                          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4xtFxXhEPCV1T2-yCGYKydsJt_ZKGwiUrKFxcgAlUQKJDxXMws7EMvr0&s" alt="user" />
                        </div>
                        <div className="reply_text__left">
                          <p className="blog_title"><span className="font-weight-bold">Thapa, </span>Aug 12, 2020, 7:20 PM</p>
                          <p>Awesome, Bro I love your content.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Third blog post */}
                  <div className="col-12 card p-4 shadow blog_left__div">
                    <div className="d-flex justify-content-center align-items-center flex-column pt-3 pb-5">
                      <h1 className="text-uppercase">Title Heading</h1>
                      <p className="blog_title"><span className="font-weight-bold">Title description, </span>Aug 12, 2020</p>
                    </div>
                    <figure className="right_side_img mb-5">
                      <img 
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS3V7KxpRWPFtXmhR4IavPJbaLmjGUNkrXJg&s" 
                        alt="tech device" 
                        className="img-fluid shadow" 
                      />
                    </figure>
                    <p><span className="font-weight-bold">Thapa Technical</span> Welcomes, all of you to my world of blog. Some text about this blog entry. Fashion fashion and mauris neque quam, fermentum ut nisl vitae, convallis maximus nisl. Sed mattis nunc id lorem euismod placerat. Vivamus porttitor magna enim, ac accumsan tortor cursus at. Phasellus sed ultricies mi non congue ullam corper. Praesent tincidunt sedtellus ut rutrum. Sed vitae justo condimentum, porta lectus vitae, ultricies congue gravida diam non fringilla.</p>
                    <p>
                      Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
                    </p>
                    <div className="d-flex justify-content-between left_div_btns">
                      <div>
                        <button 
                          className={`left_div__like ${likedButtons['post3'] ? 'liked' : ''}`} 
                          onClick={() => handleLikeClick('post3')}
                        >
                          <FontAwesomeIcon icon={faThumbsUp} /> {likedButtons['post3'] ? '✓ Liked' : 'Like'}
                        </button>
                      </div>
                      <div>
                        <button 
                          className="left_div__reply" 
                          onClick={() => toggleReply('reply3')}
                        >
                          Replies <span className="bg-white text-dark p-2">4</span>
                        </button>
                      </div>
                    </div>
                    <div className={`replies ${visibleReplies['reply3'] ? 'thapa_show' : ''}`} id="reply3">
                      {/* Reply 1 */}
                      <div className="d-flex justify-content-start flex-row align-items-center card reply_card py-3">
                        <div className="reply_img mx-2 align-self-center">
                          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPjKfddE-4BEs0bIbWES3cqRaEPg6dZxjadw&s" alt="user" />
                        </div>
                        <div className="reply_text__left">
                          <p className="blog_title"><span className="font-weight-bold">Thapa, </span>Aug 12, 2020, 7:20 PM</p>
                          <p>Awesome, informative.</p>
                        </div>
                      </div>
                      {/* Reply 2 */}
                      <div className="d-flex justify-content-start flex-row align-items-center card reply_card py-3">
                        <div className="reply_img mx-2 align-self-center">
                          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPjKfddE-4BEs0bIbWES3cqRaEPg6dZxjadw&s" alt="user" />
                        </div>
                        <div className="reply_text__left">
                          <p className="blog_title"><span className="font-weight-bold">Thapatechnical, </span>Aug 12, 2020, 7:20 PM</p>
                          <p>Awesome, oxm content.</p>
                        </div>
                      </div>
                      {/* Reply 3 */}
                      <div className="d-flex justify-content-start flex-row align-items-center card reply_card py-3">
                        <div className="reply_img mx-2 align-self-center">
                          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvlhiH6sy9qk-USNeNfj02cN3EZsYN7WtjWg&s" alt="user" />
                        </div>
                        <div className="reply_text__left">
                          <p className="blog_title"><span className="font-weight-bold">vinod, </span>Aug 12, 2020, 7:20 PM</p>
                          <p>Awesome, Bro content is useful .</p>
                        </div>
                      </div>
                      {/* Reply 4 */}
                      <div className="d-flex justify-content-start flex-row align-items-center card reply_card py-3">
                        <div className="reply_img mx-2 align-self-center">
                          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfB87hpaTOIoEoTmB_0cV1ZaAihgSCWdr1jA&s" alt="user" />
                        </div>
                        <div className="reply_text__left">
                          <p className="blog_title"><span className="font-weight-bold">DON, </span>Aug 12, 2020, 7:20 PM</p>
                          <p>Awesome, Bro I like your content.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right sidebar */}
              <div className="col-lg-3 col-md-7 col-11 justify-content-end m-lg-0 m-auto">
                <div className="row gy-5 left_div__blog">
                  {/* About me */}
                  <div className="col-12 about_me_div shadow">
                    <p>Vinod Thapa</p>
                    <p>Just me, myself and I, exploring the universe of uknownment. I have a heart of love and a interest of lorem ipsum and mauris neque quam blog. I want to share my world with you.</p>
                  </div>
                  
                  
                  {/* Advertise */}
                  <div className="right_div_post">
                    <div className="right_div__title py-4 pl-2">
                      <h2>Advertise</h2>
                    </div>
                    <div className="right_sub__div">
                      <div className="adevetise_img bg-light shadow">
                        <p>
                        <a href="https://sponsorwebsite.com" target="_blank" rel="noopener noreferrer">
                            <img
                            src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGUlMjBjb21tZXJjZXxlbnwwfHwwfHx8MA%3D%3D"  // Place your banner in public/ads
                           
                            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                            loading="lazy"
                            />
                        </a>
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Inspiration */}
                  <div className="right_div_post">
                    <div className="right_div__title py-4 pl-2">
                      <h2>Inspiration</h2>
                    </div>
                    <div className="right_sub__div">
                      <div className="row gx-3">
                        <div className="col-6">
                          <figure>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN90FubClgCWC98KNL1Fs7xWw9wshJuxtbxQ&s" className="img-fluid shadow" alt="inspiration" />
                          </figure>
                        </div>
                        <div className="col-6">
                          <figure>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReFjSQB64qFNReT7PJiF2OEiuB-Gc8fZlwwg&s" className="img-fluid shadow" alt="inspiration" />
                          </figure>
                        </div>
                        <div className="col-6">
                          <figure>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM5Ot1r4eks2LT4FEFN7J7d9Q4OP_U6kXk1A&s" className="img-fluid shadow" alt="inspiration" />
                          </figure>
                        </div>
                        <div className="col-6">
                          <figure>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTObnfFC8_vvB9VGoJenv6vGawgbGaLRbPgrg&s" className="img-fluid shadow" alt="inspiration" />
                          </figure>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Follow Me */}
                  <div className="right_div_post">
                    <div className="right_div__title py-4 pl-2">
                      <h2>Follow Me</h2>
                    </div>
                    <div className="right_sub__div d-flex justify-content-around">
                      <a href="#"><FontAwesomeIcon icon={faFacebookSquare} size="3x" /></a>
                      <a href="https://www.instagram.com/vinodthapa55/"><FontAwesomeIcon icon={faInstagram} size="3x" /></a>
                      <a href="#"><FontAwesomeIcon icon={faGithubSquare} size="3x" /></a>
                      <a href="#"><FontAwesomeIcon icon={faTwitterSquare} size="3x" /></a>
                      <a href="#"><FontAwesomeIcon icon={faYoutubeSquare} size="3x" /></a>
                      <a href="#"><FontAwesomeIcon icon={faLinkedin} size="3x" /></a>
                    </div>
                  </div>
                  
                 
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      

    </>
  );
}

export default Style1Page;