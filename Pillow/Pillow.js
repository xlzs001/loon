/**
 * 教学演示脚本：API Payload 强制篡改 (处理 304 缓存无 Body 情况)
 */

let body = $response.body;
let objc = {}; // 准备一个空对象

try {
  // 1. 尝试解析原本的数据。如果有真实数据 (比如 200 响应)，就解析它；
  // 如果是 304 没有 body，这步会跳过，objc 依然是个空对象 {}。
  if (body && typeof body === 'string' && body.trim().startsWith('{')) {
    objc = JSON.parse(body);
  }

  // 2. 动态生成时间戳
  const now = new Date();
  const purchaseDateStr = now.toISOString(); 
  const expireDate = new Date(now);
  expireDate.setFullYear(now.getFullYear() + 100); 
  const expireDateStr = expireDate.toISOString();

  // 3. 安全节点初始化 (即使 objc 原本是空的，这里也会强行把骨架搭起来)
  objc.subscriber = objc.subscriber || {};
  objc.subscriber.entitlements = objc.subscriber.entitlements || {};
  objc.subscriber.subscriptions = objc.subscriber.subscriptions || {};

  // 4. 强制注入高级权限
  objc.subscriber.entitlements["premium"] = {
    "expires_date": expireDateStr,
    "grace_period_expires_date": null,
    "product_identifier": "com.neybox.pillow.premium.month",
    "purchase_date": purchaseDateStr
  };

  objc.subscriber.subscriptions["com.neybox.pillow.premium.month"] = {
    "billing_issues_detected_at": null,
    "expires_date": expireDateStr,
    "grace_period_expires_date": null,
    "is_sandbox": false,
    "original_purchase_date": purchaseDateStr,
    "ownership_type": "PURCHASED",
    "period_type": "normal",
    "purchase_date": purchaseDateStr,
    "store": "app_store",
    "unsubscribe_detected_at": null
  };

  console.log("🎯 强制拦截成功！已构建伪造的 VIP JSON。");
  
  // 5. 终极杀招：不管原本是 304 还是什么，强行告诉 App 状态码是 200 (OK)，并塞入我们的假数据！
  $done({ status: 200, body: JSON.stringify(objc) });

} catch (e) {
  console.log("⚠️ 脚本异常: " + (e.message || e));
  $done({});
}
