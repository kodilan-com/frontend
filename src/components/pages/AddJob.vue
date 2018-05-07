<template>
  <div class="add-job">
    <div id="titlebar" class="single submit-page">
      <div class="container">

        <div class="sixteen columns">
          <h2><i class="fa fa-plus-circle"></i> Add Job</h2>
        </div>

      </div>
    </div>
    <div class="container">

      <!-- Submit Page -->
      <div class="sixteen columns">
        <div class="submit-page">

          <!-- Notice -->
          <div class="notification notice closeable margin-bottom-40">
            <p><span>Have an account?</span> If you don’t have an account you can create one below by entering your email address. A password will be automatically emailed to you.</p>
          </div>


          <!-- Email -->
          <div class="form">
            <h5>Your Email</h5>
            <input class="search-field" type="text" placeholder="mail@example.com" value=""/>
          </div>

          <!-- Title -->
          <div class="form">
            <h5>Job Title</h5>
            <input class="search-field" type="text" placeholder="" value=""/>
          </div>

          <!-- Location -->
          <div class="form">
            <h5>Location <span>(optional)</span></h5>
            <input class="search-field" type="text" placeholder="e.g. London" value=""/>
            <p class="note">Leave this blank if the location is not important</p>
          </div>

          <!-- Job Type -->
          <div class="form">
            <h5>Job Type</h5>
            <select data-placeholder="Full-Time" class="chosen-select-no-single">
              <option value="1">Full-Time</option>
              <option value="2">Part-Time</option>
              <option value="2">Internship</option>
              <option value="2">Freelance</option>
            </select>
          </div>


          <!-- Choose Category -->
          <div class="form">
            <div class="select">
              <h5>Category</h5>
              <select data-placeholder="Choose Categories" class="chosen-select" multiple>
                <option value="1">Web Developers</option>
                <option value="2">Mobile Developers</option>
                <option value="3">Designers & Creatives</option>
                <option value="4">Writers</option>
                <option value="5">Virtual Assistants</option>
                <option value="6">Customer Service Agents</option>
                <option value="7">Sales & Marketing Experts</option>
                <option value="8">Accountants & Consultants</option>
              </select>
            </div>
          </div>

          <!-- Tags -->
          <div class="form">
            <h5>Job Tags <span>(optional)</span></h5>
            <input class="search-field" type="text" placeholder="e.g. PHP, Social Media, Management" value=""/>
            <p class="note">Comma separate tags, such as required skills or technologies, for this job.</p>
          </div>


          <!-- Description -->
          <div class="form">
            <h5>Description</h5>
            <textarea class="WYSIWYG" name="summary" cols="40" rows="3" id="summary" spellcheck="true"></textarea>
          </div>

          <!-- Application email/url -->
          <div class="form">
            <h5>Application email / URL</h5>
            <input type="text" placeholder="Enter an email address or website URL">
          </div>

          <!-- TClosing Date -->
          <div class="form">
            <h5>Closing Date <span>(optional)</span></h5>
            <input data-role="date" type="text" placeholder="yyyy-mm-dd">
            <p class="note">Deadline for new applicants.</p>
          </div>


          <!-- Company Details -->
          <div class="divider"><h3>Company Details</h3></div>

          <!-- Company Name -->
          <div class="form">
            <h5>Company Name</h5>
            <input type="text" placeholder="Enter the name of the company">
          </div>

          <!-- Website -->
          <div class="form">
            <h5>Website <span>(optional)</span></h5>
            <input type="text" placeholder="http://">
          </div>

          <!-- Teagline -->
          <div class="form">
            <h5>Tagline <span>(optional)</span></h5>
            <input type="text" placeholder="Briefly describe your company">
          </div>

          <!-- Video -->
          <div class="form">
            <h5>Video <span>(optional)</span></h5>
            <input type="text" placeholder="A link to a video about your company">
          </div>

          <!-- Twitter -->
          <div class="form">
            <h5>Twitter Username <span>(optional)</span></h5>
            <input type="text" placeholder="@yourcompany">
          </div>

          <!-- Logo -->
          <div class="form">
            <h5>Logo <span>(optional)</span></h5>
            <label class="upload-btn">
                <input type="file" multiple />
                <i class="fa fa-upload"></i> Browse
            </label>
            <span class="fake-input">No file selected</span>
          </div>


          <div class="divider margin-top-0"></div>
          <a href="#" class="button big margin-top-5">Preview <i class="fa fa-arrow-circle-right"></i></a>


        </div>
      </div>

    </div>
  </div>
</template>
