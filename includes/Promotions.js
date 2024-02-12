var node = document.getElementById("custom_tab_data");
node.innerHTML = `<div style="width: 100%;height:350px">
    <p style=" text-align: center;padding-top:40px;line-height: 20px; font-size: 16px; font-weight: 600;">Boost Your Online Store Sales</p>
    <p style=" text-align: center;line-height: 20px; font-size: 13px;">Maximize your sales by creating effective </br> promotions and campaigns like:</p>
    <div style="text-align: center;">
      <div style="display: flex;flex:1; align-items: center; justify-content:  space-around ;margin:0 auto; width: 60%;padding:20px 0">
        <div style=" text-align: center;">
          <span class="dashicons dashicons-cart"></span>
          <p style="line-height: 16px;font-weight: 600;">Free </br> Shipping</p>
        </div>
        <div style=" text-align: center;">
          <span class="dashicons dashicons-cart"></span>
          <p style="line-height: 16px;font-weight: 600;">Buy One,</br>Get One</p>
        </div>
        <div style=" text-align: center;">
          <span class="dashicons dashicons-cart"></span>
          <p style="line-height: 16px;font-weight: 600;">Free Gift</br>in Cart</p>
        </div>
        <div style=" text-align: center;">
          <span class="dashicons dashicons-cart"></span>
          <p style="line-height: 16px;font-weight: 600;">Frequently</br>Bought Together</p>
        </div>
      </div>
    </div>
    <div style="text-align: center;">
    <a href="${promotionData.redirectUrl}" style="color:white;background-color:#196BDE;text-decoration: none;border-radius: 6px;display: inline-block; border: 1px solid #2671B1;padding:8px 16px 8px 16px;font-size: 13px;text-align: center">Create a Promotion</a>
    <div/>
</div>`;
