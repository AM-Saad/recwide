<template>
  <div>
    <div class="wrapper">
      <section id="about">
        <h2>About us</h2>
        <p>
          Our aim to give every content creator, teacher, or anyone who wants to
          record anything the ability to do it free without that annoying
          watermark or even a specific time that cannot be exceeded. Recwide is
          a completely free screen and camera recorder that works online,
          however, since it's a PWA ( Progressive Web App ) it could be
          installed on your laptop to enjoy using it whether you're online or
          offline.
        </p>
      </section>
      <section id="services" class="grid">
        <h2>Why Choose Recwide</h2>

        <div class="grid g-two">
          <div class="services-item hvr-bob">
            <div class="icon">
              <img src="@/assets/images/free.png" alt="" />
            </div>
            <div class="mt-3">
              <h5 class="mb-2" style="font-weight: 600">Free</h5>
              <p>
                No credit card required or any payments, you don't need to pay
                anything. enjoy it
              </p>
            </div>
          </div>

          <div class="services-item hvr-bob">
            <div class="icon">
              <img src="@/assets/images/nodown.png" alt="" />
            </div>

            <div class="mt-3">
              <h5 class="mb-2" style="font-weight: 600">
                Online(No Downlaod Required)
              </h5>
              <p>
                Click START its all that it takes, however, since it's a PWA you
                could install it to make it available on your computer
              </p>
            </div>
          </div>

          <div class="services-item hvr-bob">
            <div class="icon">
              <img src="@/assets/images/screen.png" alt="" />
            </div>

            <div class="mt-3">
              <h5 class="mb-2" style="font-weight: 600">Flexable Recording</h5>
              <p>
                Whether you want to record the entire screen or just a browser
                tab it's up to you. you could also record the screen and the
                webcam at the same time
              </p>
            </div>
          </div>

          <div class="services-item hvr-bob">
            <div class="icon">
              <img src="@/assets/images/mic.png" alt="" />
            </div>

            <div class="mt-3">
              <h5 class="mb-2" style="font-weight: 600">Audio Options</h5>
              <p>
                Audio can also be recorded simultaneously if you prefer. Choose
                between audio options to control your audios
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer>
      <div class="footer-wrapper grid">
        <div class="footer-social">
          <ul>
            <li>
              <a href=""><i class="fab fa-facebook-f"></i></a>
            </li>
            <li>
              <a href=""><i class="fab fa-twitter"></i></a>
            </li>
            <li>
              <a href=""><i class="fab fa-instagram"></i></a>
            </li>
            <li>
              <a href=""><i class="fab fa-google"></i></a>
            </li>
          </ul>
          <ul class="footer-contact_menu">
            <li><a href="">Support</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact </a></li>
          </ul>
        </div>
      </div>
    </footer>
    <p class="footer-copyright">
      Designed and developed by
      <a style="color: #fff" href="https://amsstudio.me">AMS-Studio</a>
    </p>
  </div>
</template>

<script>
export default {

  name: "home",
  components: {},
  computed: {},
  created() {},
};
</script>

<style scoped>
#about p{
  font-size: 22px;
    font-weight: 700;
    margin-top: var(--m-margin);
    line-height: 1.7;
    color: #333;
}
.services-item {
  padding: var(--m-padding);
  text-align: center;
  background-color: #fff;
  border-radius: var(--m-radius);
  color: var(--scnd-color);
  box-shadow: var(--shadow3);
  margin: var(--m-margin);
  min-height: 200px;
}

.services-item .icon {
  /* background-color: #000; */
  width: 80px;
  height: 80px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
}
.services-item .icon img {
  height: 70%;
  width: 70%;
}
.services-item:nth-child(1) {
  background: linear-gradient(135deg, #d8ffa6 0%, #6cf08f 30%, #06d68f 100%);
}
.services-item:nth-child(2) {
  background: linear-gradient(135deg, #fff388 0%, #febc58 30%, #ffa234 100%);
}
.services-item:nth-child(3) {
  background: linear-gradient(135deg, #a3ebfa 0%, #6fa6fe 30%, #375aff 100%);
}
.services-item:nth-child(4) {
  background: linear-gradient(135deg, #ffbbbb 0%, #fe6061 30%, #f53e6c 100%);
}
.services-item:nth-child(1) .icon {
  background: linear-gradient(135deg, #d8ffa6 0%, #6cf08f 30%, #06d68f 100%);
}
.services-item:nth-child(2) .icon {
  background: linear-gradient(135deg, #fff388 0%, #febc58 30%, #ffa234 100%);
}
.services-item:nth-child(3) .icon {
  background: linear-gradient(135deg, #a3ebfa 0%, #6fa6fe 30%, #375aff 100%);
}
.services-item:nth-child(4) .icon {
  background: linear-gradient(135deg, #ffbbbb 0%, #fe6061 30%, #f53e6c 100%);
}

.services-item p {
  color: #f9f9f9;
  font-size: 16px;
  text-align: center;
  margin: var(--m-margin);
}
.services-item h5 {
  color: #222;
  font-weight: bold;
  font-size: 22px;
  text-align: center;
  margin: var(--m-margin);
}

section#signup .section-wrapper form {
  padding: var(--m-padding);
  border-radius: var(--s-radius);
  background-color: #f9f9f9;
}

section#signup p {
  font-size: 28px;
  color: var(--scnd-color);
  margin: var(--m-margin) 0;
}

section#signup p span {
  color: var(--main-color);
  font-weight: bold;
}

footer {
  position: relative;
  z-index: 1;
  background-color: #333;
  background-image: url(/images/footer.svg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}

.footer-wrapper {
  font-size: 20px;
}

.footer-wrapper > div {
  margin: var(--l-margin) var(--m-margin);
}

.footer-social ul {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: var(--l-margin);
}

.footer-social ul li {
  margin-right: var(--l-margin);
}

.footer-wrapper ul li a {
  color: #fff;
  transition: 0.3s;
  text-decoration: none;
  font-size: 30px;
}

.footer-wrapper ul li a:hover {
  color: var(--main-color);
}

.footer-contact p {
  color: #fff;
  margin: var(--s-margin);
}

@media only screen and (max-width: 768px) {
  .header-intro p {
    margin: var(--s-margin);
    font-size: 17px;
  }
  section h2 {
    font-size: 30px;
  }
  section#signup p {
    font-size: 22px;
  }
  .footer-wrapper ul li a {
    font-size: 18px;
  }
  .footer-social ul {
    margin: var(--m-margin) var(--s-margin);
  }
}
</style>
