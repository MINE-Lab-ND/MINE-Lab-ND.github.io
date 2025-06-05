/**
 * 清除缓存的专用JavaScript
 */

// 当前缓存版本 - 更改此值将使所有以前的缓存失效
const CACHE_VERSION = 'v' + new Date().getTime();

// 安装Service Worker并注册缓存清除机制
if ('serviceWorker' in navigator) {
  // 尝试注销之前的Service Worker
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for (let registration of registrations) {
      registration.unregister();
    }
    console.log('Previous Service Workers unregistered');
    
    // 注册新的Service Worker，强制清除缓存
    navigator.serviceWorker.register('/sw-cache-buster.js', {
      scope: '/'
    }).then(function() {
      console.log('Service Worker registered with cache version: ' + CACHE_VERSION);
    }).catch(function(error) {
      console.error('Service Worker registration failed:', error);
    });
  });
}

// 清除所有可能的缓存
function clearAllCaches() {
  // 清除localStorage
  if (window.localStorage) {
    localStorage.clear();
    console.log('Local Storage cleared');
  }
  
  // 清除sessionStorage
  if (window.sessionStorage) {
    sessionStorage.clear();
    console.log('Session Storage cleared');
  }
  
  // 通过重新加载CSS文件强制浏览器重新获取
  const links = document.getElementsByTagName('link');
  for (let i = 0; i < links.length; i++) {
    if (links[i].rel === 'stylesheet') {
      const href = links[i].href;
      const newHref = href.split('?')[0] + '?v=' + new Date().getTime();
      links[i].href = newHref;
    }
  }
  
  // 为所有图片添加时间戳
  const images = document.getElementsByTagName('img');
  for (let i = 0; i < images.length; i++) {
    const src = images[i].src;
    if (src && !src.includes('data:image')) { // 跳过base64编码图像
      images[i].src = src.split('?')[0] + '?v=' + new Date().getTime();
    }
  }
  
  // 尝试清除浏览器缓存API
  if (window.caches) {
    window.caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          return window.caches.delete(cacheName);
        })
      );
    }).then(function() {
      console.log('Browser caches cleared');
    });
  }

  console.log('All caches cleared at: ' + new Date().toLocaleString());
}

// 页面加载时执行
document.addEventListener('DOMContentLoaded', function() {
  clearAllCaches();
});

// 添加reload按钮的事件监听器
$(document).ready(function() {
  // 添加一个刷新按钮到页面
  const refreshButton = $('<button id="refresh-cache" style="position: fixed; bottom: 10px; right: 10px; z-index: 9999; background-color: #0c2340; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; display: none;"><i class="fas fa-sync-alt"></i> 强制刷新</button>');
  $('body').append(refreshButton);
  
  // 显示按钮（仅在开发环境）
  setTimeout(function() {
    $('#refresh-cache').fadeIn();
  }, 1000);
  
  // 添加点击事件
  $('#refresh-cache').on('click', function() {
    clearAllCaches();
    // 添加强制刷新的URL参数
    const timestamp = new Date().getTime();
    let url = window.location.href;
    url = url.split('?')[0]; // 移除任何现有的查询参数
    window.location.href = url + '?nocache=' + timestamp;
  });
}); 