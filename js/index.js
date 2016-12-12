'use strict';
const process = require('child_process');
const fs = require('fs');

let blogDir = undefined;
let allPost = undefined;

window.onload = function () {
  //获取目录
  const viewFile = document.querySelector('#blogdir');
  viewFile.addEventListener('change', function () {
    const dirname = document.querySelector('#dirname');
    dirname.innerHTML = this.files[0].path;
    blogDir = this.files[0].path;
    document.querySelector('.section').style.visibility = 'visible';
    listpost()
  });

  const localhost = document.querySelector('.localhost');
  localhost.addEventListener('click', openServer);
  const openbr = document.querySelector('.open-Br');
  openbr.addEventListener('click', openBr);
  //控制台输出
  const tminput = document.querySelector('.temin-input');
  //获取所有post
  const getPost = document.querySelector('.get-all-post');
  getPost.addEventListener('click', listpost);
  //添加post
  const addPost = document.querySelector('.add-post');
  const blogName = document.querySelector('.blogname');
  addPost.addEventListener('click', addMore);
  //添加页面
  const addPage = document.querySelector('.add-page');
  addPage.addEventListener('click', addMore);
  //添加博客和页面函数。
  function addMore(e) {
    if (blogName){
      let tmstr = '';
      let parameter = e.target.dataset.parameter ? e.target.dataset.parameter.toString() : ''; //获取参数
      tmstr = 'hexo new ' + parameter + ' ' + blogName.value; //控制台参数。
      process.exec(tmstr, {cwd:blogDir}, function (error, stdout, stderr) {
        if (error) {
          tminput.innerHTML = error;
        } else {
          tminput.innerHTML = stdout;
        }
      })
    }
  }
  //打开服务器
  function openServer() {
    if (blogDir){
      process.exec('hexo s', {cwd: blogDir},function (error, stdout, stderr) {
        if (error){
          tminput.innerHTML = error;
          localhost.innerHTML = '服务器已经打开';
          localhost.disabled = "disabled";
        } else {
          tminput.innerHTML = stdout;
          localhost.innerHTML = '服务器已经打开';
          localhost.disabled = "disabled";
        }
      })
    }
  }
  //打开浏览器
  function openBr() {
    process.exec('open http://localhost:4000', function (error, stdout, stderr) {
      if (error){
        console.log(error);
      }
    })
  }
  function createFile() {
    process.exec('touch hehe.txt', function (error, stdout, stderr) {
      if (error){
        console.log(error);
      }else {
        console.log(stdout);
      }
    })
  }
  //显示所有文件。
  function listpost() {
    document.querySelector('.list').style.display = 'flex';
    allPost = getAllPost(blogDir);
    let lipost = allPost.map(li => '<li>' +li +'</li>').join(' ');
    let allp = document.querySelector('.list').innerHTML = lipost;
    let lls = document.querySelectorAll('.list li');
    for (let i = 0; i < lls.length; i++){
      lls[i].addEventListener('click', openPost);
    }
  }
  //给文件添加打开方法
  function openPost(e) {
    let dir = blogDir + '/source/_posts/';
    let fileName = e.target.innerHTML;
    process.exec('open ' + dir + fileName, function (error, stdout, stderr) {
      if (error){
        tminput.innerHTML = error;
      } else {
        tminput.innerHTML = fileName + '被打开.';
      }
    })
  }

  function getAllPost(dir) {
    if (dir){
      let files = fs.readdirSync(dir + '/source/_posts/');
      return files;
    }
  }

};