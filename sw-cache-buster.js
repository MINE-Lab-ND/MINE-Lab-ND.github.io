/**
 * 缓存清除 Service Worker
 */

// 缓存版本 - 每次部署改变这个值
const CACHE_VERSION = 'v' + new Date().getTime();
const CACHE_NAME = 'mine-lab-cache-' + CACHE_VERSION;

// Service Worker 安装事件
self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker with cache version:', CACHE_VERSION);
  
  // 强制立即激活，不等待现有Service Worker终止
  event.waitUntil(self.skipWaiting());
});

// Service Worker 激活事件
self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker with cache version:', CACHE_VERSION);
  
  // 清除所有旧缓存
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(function() {
      // 确保Service Worker立即控制所有客户端
      return self.clients.claim();
    })
  );
});

// 请求拦截
self.addEventListener('fetch', function(event) {
  // 强制网络请求，绕过缓存
  event.respondWith(
    fetch(event.request).then(function(response) {
      // 对成功的响应创建副本
      const responseClone = response.clone();
      
      // 打开缓存
      caches.open(CACHE_NAME).then(function(cache) {
        // 将请求添加到缓存中
        cache.put(event.request, responseClone);
      });
      
      return response;
    }).catch(function() {
      // 如果网络请求失败，则尝试从缓存中获取
      return caches.match(event.request);
    })
  );
});

// 消息处理
self.addEventListener('message', function(event) {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
  
  if (event.data === 'clearCache') {
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    }).then(function() {
      console.log('[Service Worker] All caches cleared by request');
    });
  }
}); 