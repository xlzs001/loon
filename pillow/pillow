let body = $response.body;

try {
  if (!body || typeof body !== 'string' || !body.trim().startsWith('{')) {
    throw new Error("响应体为空或非标准 JSON 格式");
  }
  let objc = JSON.parse(body);
  const now = new Date();
  const purchaseDateStr = now.toISOString(); 
  const expireDate = new Date(now);
  expireDate.setFullYear(now.getFullYear() + 100); 
  const expireDateStr = expireDate.toISOString();
  objc.subscriber = objc.subscriber || {};
  objc.subscriber.entitlements = objc.subscriber.entitlements || {};
  objc.subscriber.subscriptions = objc.subscriber.subscriptions || {};
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
  console.log("🎯 权限模拟成功，已下发伪造的 VIP 数据！");
  $done({ body: JSON.stringify(objc) });

} catch (e) {
  console.log("⚠️ 数据重写脚本异常，已放行原始数据: " + (e.message || e));
  $done({});
}
