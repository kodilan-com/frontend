<template>
  <div class="five columns">
    <h3 class="margin-bottom-5">Öne çıkan ilanlar</h3>
    <div class="showbiz-navigation">
      <div class="sb-navigation-left">
        <i class="fa fa-angle-left"></i>
      </div>
      <div class="sb-navigation-right">
        <i class="fa fa-angle-right"></i>
      </div>
    </div>
    <div class="clearfix"></div>
    <div id="job-spotlight">
      <div class="showbiz">
        <div class="wrapper">
          <ul>
            <li>
              <div class="job-spotlight">
                <a href="#">
                  <h4>Social Media: Advertising Coordinator
                    <span class="part-time">Part-Time</span>
                  </h4>
                </a>
                <span>
                  <i class="fa fa-briefcase"></i> Mates</span>
                <span>
                  <i class="fa fa-map-marker"></i> New York</span>
                <span>
                  <i class="fa fa-money"></i> $20 / hour</span>
                <p>As advertising & content coordinator, you will support our social media team in producing high quality
                  social content for a range of media channels.</p>
                <a href="job-page.html" class="button">Apply For This Job</a>
              </div>
            </li>

            <li>
              <div class="job-spotlight">
                <a href="#">
                  <h4>Prestashop / WooCommerce Product Listing
                    <span class="freelance">Freelance</span>
                  </h4>
                </a>
                <span>
                  <i class="fa fa-briefcase"></i> King</span>
                <span>
                  <i class="fa fa-map-marker"></i> London</span>
                <span>
                  <i class="fa fa-money"></i> $25 / hour</span>
                <p>Etiam suscipit tellus ante, sit amet hendrerit magna varius in. Pellentesque lorem quis enim venenatis
                  pellentesque.</p>
                <a href="job-page.html" class="button">Apply For This Job</a>
              </div>
            </li>

            <li>
              <div class="job-spotlight">
                <a href="#">
                  <h4>Logo Design
                    <span class="freelance">Freelance</span>
                  </h4>
                </a>
                <span>
                  <i class="fa fa-briefcase"></i> Hexagon</span>
                <span>
                  <i class="fa fa-map-marker"></i> Sydney</span>
                <span>
                  <i class="fa fa-money"></i> $10 / hour</span>
                <p>Proin ligula neque, pretium et ipsum eget, mattis commodo dolor. Etiam tincidunt libero quis commodo.</p>
                <a href="job-page.html" class="button">Apply For This Job</a>
              </div>
            </li>
          </ul>
          <div class="clearfix"></div>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>
</template>


<style lang="scss">
#job-spotlight {
  .wrapper {
    overflow: hidden;

    ul {
      overflow: hidden;
      width: 1065px;
      height: 420px;
    }

    li {
      float: left;
      width: 355px;
    }
  }
}
</style>
