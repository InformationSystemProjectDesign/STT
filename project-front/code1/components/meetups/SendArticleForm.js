import { useRef } from 'react';
import { Fragment } from "react";
import Head from "next/head";
import Link from 'next/link';
import getBaseUrl from "../../pages/const";

// 爬蟲文章api
function ArticleForm() {
  const URLInputRef = useRef(); // 和文章連結的input綁起來

  var article_d = "";
  var singer_d = "";
  var song_d = "";
  var art_mood_d = "";
  var songURL_d = "";

  function submitHandler(event) {
    event.preventDefault(); //當按下送出鍵的function
    $('#loading_icon').show();
    $('#hint_message').show();
    const enteredURL = URLInputRef.current.value;

    const articleData = {
      art_craw: enteredURL
    };

    console.log(articleData);

    fetch(getBaseUrl + "crawler/add-article", {
      method: "POST",
      body: JSON.stringify(articleData) /*把json資料字串化*/,
      headers: new Headers({
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      }),
    })
      .then((res) => {
        console.log("res", res);
        if (res.ok) {
          return res.json();
        } else {
          throw "送出失敗json";
        }
      })
      .then((data) => {
        /*接到request data後要做的事情*/
        $('#loading_icon').hide();
        $('#hint_message').hide();
        // console.log("data:", data);
        article_d = data['result']['article'];
        singer_d = data['result']['singer'];
        song_d = data['result']['song'];
        art_mood_d = data['result']['art_mood'];
        songURL_d = data['result']['songURL'];

        document.getElementById("article_d").innerHTML=article_d;
        document.getElementById("song").innerHTML=song_d + " - " + singer_d + " - 情緒:" + art_mood_d;
        document.getElementById("songURL_d").innerHTML=songURL_d;
        document.getElementById("songURL_d").href=songURL_d; 

        // console.log(article_d);
        // console.log(singer_d);
        // console.log(song_d);
        // console.log(art_mood_d);
        // console.log(songURL_d);

        // console.log("data", data['result']['art_mood']);
        // sessionStorage.setItem("token", data.token);  //儲存token
        // router.push('/personal_space')  //跳轉頁面
      })
      .catch((e) => {
        /*發生錯誤時要做的事情*/
        console.log("ee", e);
        alert('送出失敗') //系統頁面提示訊息登入失敗
      });
  }

  return (
    <Fragment>
      {/* link */}
      {/* <link href="https://fonts.googleapis.com/css?family=Noto+Serif+TC&amp;display=swap" rel="stylesheet"/> */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.2.1/dist/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous"></link>
      <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.6/dist/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.2.1/dist/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous"></script>
      <Head>
        <title>送出文章</title>
        <meta
          name="description"
          content="Browse a huge list of active React meetups!"
        />
      </Head>
      
      {/* 文章送出表單 */}
      
        <div class="flex items-center justify-center p-12 pt-0">
            <div class="mx-auto w-full max-w-[550px]">
                <form action="https://formbold.com/s/FORM_ID" method="POST">
                    <label
                        for="name"
                        class="mb-3 block text-left text-1xl font-bold"
                    >
                    個人天地 - 寫信
                    </label>
                    <div class="w-full rounded-md border-[#000000] border-[3px] py-3 px-6 text-base outline-none focus:border-gray-800  focus:shadow-md">
                    {/* 文章連結 */}
                     <div class="mb-5">              
                        <input
                            type="text"
                            name="url"
                            id="url"
                            placeholder="文章連結"
                            ref={URLInputRef}
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-gray-800 focus:shadow-md"
                        />
                    </div>
            
                    {/* dcard文章送出btn */}
                    <div class="mb-5">
                        <button 
                        onClick={submitHandler}
                        class="w-full rounded-md bg-white transition duration-150 ease-in-out hover:border-gray-900 hover:text-gray-900 border text-gray-800 px-6 py-2 text-base hover:bg-gray-100 focus:outline-none"
                        >
                            Dcard/PTT連結送出
                        </button>
                    </div>
                    {/* ptt文章送出btn */}
                    {/* <div class="mb-5"> */}
                        {/* <button class="w-full rounded-md bg-white transition duration-150 ease-in-out hover:border-gray-900 hover:text-gray-900 border text-gray-800 px-6 py-2 text-base hover:bg-gray-100 focus:outline-none"> */}
                            {/* PTT連結送出 */}
                        {/* </button> */}
                    {/* </div> */}

                    {/* loading icon */}
                    <div class="spinner-border text-secondary" role="status" id="loading_icon" style={{display:'none'}}> 
                      <span class="sr-only">Loading...</span>
                    </div>
                    <span id="hint_message" style={{display:'none'}}>系統正在為您產生推薦歌曲，請耐心等待 謝謝您</span>

                    <label
                        for="name"
                        class="mb-3 block text-left text-base font-bold">
                        <p id="article_d"></p>
                    </label>

                    <label
                        for="name"
                        class="mb-3 block text-center text-base font-bold">
                        <p id="song">{/* song_d */} - {/* singer_d */} - {/* art_mood_d */}</p>
                        <a id="songURL_d" href="#" target={{target:'_blank'}}>{/* songURL_d */}</a>                        
                    </label>
                    </div>
                </form>
                
            </div>
        </div>
      
    </Fragment>
  );
}

export default ArticleForm;