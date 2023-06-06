<script>
import { defineComponent } from "vue";

// Components

export default defineComponent({
  name: "LandingView",

  components: {
  },
});
</script>
<template>
  <!-- =========={ MAIN }==========  -->
  <main id="content">
    <!-- home start -->
    <div id="home" class="section relative z-0 py-16 md:pt-32 md:pb-20 bg-gray-50">
      <div class="container xl:max-w-6xl mx-auto px-4">
        <div class="flex flex-wrap flex-row -mx-4 justify-center">
          <!-- content -->
          <div class="flex-shrink max-w-full px-4 sm:px-12 lg:px-18 w-full sm:w-9/12 lg:w-1/2 self-center">
            <img src="@assets/images/home.svg" class="w-full max-w-full h-auto" alt="creative agency">
          </div><!-- end content -->

          <!-- text -->
          <div class="flex-shrink max-w-full px-4 w-full md:w-9/12 lg:w-1/2 self-center lg:pr-12">
            <div class="text-center lg:text-left mt-6 lg:mt-0">
              <div class="mb-12">
                <h1 class="text-4xl leading-normal text-black font-bold mb-4">Keep learning & unlock the power of your
                  brain<span data-toggle="typed"
                    data-options='{"strings": ["Online Marketing", "Web Design", "Mobile Apps", "Brand Identity", "Social Content"]}'></span>
                </h1>
                <p class="text-gray-500 leading-relaxed font-light text-xl mx-auto pb-2">Create, send and analyze your
                  tests, quizzes and assessments for free with EasyQuiz.</p>
              </div>

              <router-link to="/login-register/register"
                class="py-2.5 px-10 inline-block text-center leading-normal text-gray-100 bg-black border-b border-gray-800 hover:text-white hover:ring-0 focus:outline-none focus:ring-0">
                Get started for free
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6 inline-block">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div><!-- end home -->

    <!-- start services -->
    <div id="services" class="section relative pt-20 pb-8 md:pt-16 md:pb-0 bg-white">
      <div class="container xl:max-w-6xl mx-auto px-4">
        <!-- Heading start -->
        <header class="text-center mx-auto mb-12 lg:px-20">
          <h2 class="text-2xl leading-normal mb-2 font-bold text-black">What We Do</h2>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 100 60" style="margin: 0 auto;height: 35px;" xml:space="preserve">
            <circle cx="50.1" cy="30.4" r="5" class="stroke-primary"
              style="fill: transparent;stroke-width: 2;stroke-miterlimit: 10;"></circle>
            <line x1="55.1" y1="30.4" x2="100" y2="30.4" class="stroke-primary"
              style="stroke-width: 2;stroke-miterlimit: 10;"></line>
            <line x1="45.1" y1="30.4" x2="0" y2="30.4" class="stroke-primary"
              style="stroke-width: 2;stroke-miterlimit: 10;"></line>
          </svg>
          <p class="text-gray-500 leading-relaxed font-light text-xl mx-auto pb-2">Motivate every learner to mastery.</p>
        </header><!-- End heading -->

        <!-- row -->
        <div class="flex flex-wrap flex-row -mx-4 text-center">
          <div class="flex-shrink px-4 max-w-full w-full sm:w-1/2 lg:w-1/3 lg:px-6 wow fadeInUp" data-wow-duration="1s">
            <!-- service block -->
            <div
              class="py-8 px-12 mb-12 bg-gray-50 border-b border-gray-100 transform transition duration-300 ease-in-out hover:-translate-y-2">
              <div class="inline-block text-gray-900 mb-4">
                <!-- icon -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" width="2rem" height="2rem">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>

              </div>
              <h3 class="text-lg leading-normal mb-2 font-semibold text-black">Create question</h3>
              <p class="text-gray-500">Create your quiz. Attention should be paid to the type of exam questions, exam
                time, .. to maximize the effectiveness of the exam.</p>
            </div> <!-- end service block -->
          </div>

          <div class="flex-shrink px-4 max-w-full w-full sm:w-1/2 lg:w-1/3 lg:px-6 wow fadeInUp" data-wow-duration="1s"
            data-wow-delay=".1s">
            <!-- service block -->
            <div
              class="py-8 px-12 mb-12 bg-gray-50 border-b border-gray-100 transform transition duration-300 ease-in-out hover:-translate-y-2">
              <div class="inline-block text-gray-900 mb-4">
                <!-- icon -->
                <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill="currentColor"
                  class="bi bi-search" viewBox="0 0 16 16">
                  <path
                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>

              </div>
              <h3 class="text-lg leading-normal mb-2 font-semibold text-black">Questions bank</h3>
              <p class="text-gray-500">Create your quiz. Attention should be paid to the type of exam questions, exam
                time, .. to maximize the effectiveness of the exam.</p>
            </div><!-- end service block -->
          </div>

          <div class="flex-shrink px-4 max-w-full w-full sm:w-1/2 lg:w-1/3 lg:px-6 wow fadeInUp" data-wow-duration="1s"
            data-wow-delay=".3s">
            <!-- service block -->
            <div
              class="py-8 px-12 mb-12 bg-gray-50 border-b border-gray-100 transform transition duration-300 ease-in-out hover:-translate-y-2">
              <div class="inline-block text-gray-900 mb-4">
                <!-- icon -->
                <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill="currentColor"
                  class="bi bi-chat-square-dots" viewBox="0 0 16 16">
                  <path
                    d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                  <path
                    d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
              </div>
              <h3 class="text-lg leading-normal mb-2 font-semibold text-black">Communicate</h3>
              <p class="text-gray-500">Create your quiz. Attention should be paid to the type of exam questions, exam
                time, .. to maximize the effectiveness of the exam.</p>
            </div><!-- end service block -->
          </div>

          <div class="flex-shrink px-4 max-w-full w-full sm:w-1/2 lg:w-1/3 lg:px-6 wow fadeInUp" data-wow-duration="1s">
            <!-- service block -->
            <div
              class="py-8 px-12 mb-12 bg-gray-50 border-b border-gray-100 transform transition duration-300 ease-in-out hover:-translate-y-2">
              <div class="inline-block text-gray-900 mb-4">
                <!-- icon -->
                <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill="currentColor"
                  class="bi bi-card-checklist" viewBox="0 0 16 16">
                  <path
                    d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
                  <path
                    d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z" />
                </svg>
              </div>
              <h3 class="text-lg leading-normal mb-2 font-semibold text-black">Statistical</h3>
              <p class="text-gray-500">Create your quiz. Attention should be paid to the type of exam questions, exam
                time, .. to maximize the effectiveness of the exam.</p>
            </div><!-- end service block -->
          </div>

          <div class="flex-shrink px-4 max-w-full w-full sm:w-1/2 lg:w-1/3 lg:px-6 wow fadeInUp" data-wow-duration="1s"
            data-wow-delay=".1s">
            <!-- service block -->
            <div
              class="py-8 px-12 mb-12 bg-gray-50 border-b border-gray-100 transform transition duration-300 ease-in-out hover:-translate-y-2">
              <div class="inline-block text-gray-900 mb-4">
                <!-- icon -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" width="2rem" height="2rem">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                </svg>

              </div>
              <h3 class="text-lg leading-normal mb-2 font-semibold text-black">Feedback</h3>
              <p class="text-gray-500">Create your quiz. Attention should be paid to the type of exam questions, exam
                time, .. to maximize the effectiveness of the exam.</p>
            </div><!-- end service block -->
          </div>

          <div class="flex-shrink px-4 max-w-full w-full sm:w-1/2 lg:w-1/3 lg:px-6 wow fadeInUp" data-wow-duration="1s"
            data-wow-delay=".3s">
            <!-- service block -->
            <div
              class="py-8 px-12 mb-12 bg-gray-50 border-b border-gray-100 transform transition duration-300 ease-in-out hover:-translate-y-2">
              <div class="inline-block text-gray-900 mb-4">
                <!-- icon -->
                <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill="currentColor"
                  class="bi bi-funnel" viewBox="0 0 16 16">
                  <path
                    d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z" />
                </svg>
              </div>
              <h3 class="text-lg leading-normal mb-2 font-semibold text-black">Data analysis</h3>
              <p class="text-gray-500">Create your quiz. Attention should be paid to the type of exam questions, exam
                time, .. to maximize the effectiveness of the exam.</p>
            </div><!-- end service block -->
          </div>
        </div><!-- end row -->
      </div>
    </div><!-- End Service -->

    <!-- contact start -->
    <div id="contact" class="section relative pb-20 bg-white dark:bg-gray-800">
      <div class="container xl:max-w-6xl mx-auto px-4">
        <div class="flex flex-wrap flex-row -mx-4 justify-center">
          <div class="max-w-ful px-4 w-full lg:w-8/12">
            <div class="bg-gray-50 border-b border-gray-100 w-full p-12 wow fadeInUp" data-wow-duration="1s"
              data-wow-delay=".5s">
              <!-- section header -->
              <header class="text-center mx-auto mb-12 lg:px-20">
                <h2 class="text-2xl leading-normal mb-2 font-bold text-gray-800 dark:text-gray-100"><span
                    class="font-light">Contact</span> Us</h2>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
                  y="0px" viewBox="0 0 100 60" style="margin: 0 auto;height: 35px;" xml:space="preserve">
                  <circle cx="50.1" cy="30.4" r="5" class="stroke-primary"
                    style="fill: transparent;stroke-width: 2;stroke-miterlimit: 10;"></circle>
                  <line x1="55.1" y1="30.4" x2="100" y2="30.4" class="stroke-primary"
                    style="stroke-width: 2;stroke-miterlimit: 10;"></line>
                  <line x1="45.1" y1="30.4" x2="0" y2="30.4" class="stroke-primary"
                    style="stroke-width: 2;stroke-miterlimit: 10;"></line>
                </svg>
                <p class="text-gray-600 leading-relaxed font-light text-xl mx-auto pb-2">Have questions about service,
                  please contact us.</p>
              </header><!-- end section header -->

              <!-- contact form -->
              <form action="#">
                <div class="flex flex-wrap flex-row -mx-4">
                  <div class="flex-shrink w-full max-w-full md:w-1/2 px-4 mb-6">
                    <label class="inline-block mb-2" for="name">Your Name</label>
                    <input type="text" name="name"
                      class="w-full leading-5 relative py-3 px-5 rounded text-gray-800 bg-white border-b border-gray-100 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-600"
                      id="name">
                    <div class="validate"></div>
                  </div>
                  <div class="flex-shrink w-full max-w-full md:w-1/2 px-4 mb-6">
                    <label class="inline-block mb-2" for="email">Your Email</label>
                    <input type="email"
                      class="w-full leading-5 relative py-3 px-5 rounded text-gray-800 bg-white border-b border-gray-100 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-600"
                      name="email" id="email">
                    <div class="validate"></div>
                  </div>
                </div>
                <div class="mb-6">
                  <label class="inline-block mb-2" for="subject">Subject</label>
                  <input type="text"
                    class="w-full leading-5 relative py-3 px-5 rounded text-gray-800 bg-white border-b border-gray-100 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-600"
                    name="subject" id="subject">
                  <div class="validate"></div>
                </div>
                <div class="mb-6">
                  <label class="inline-block mb-2" for="messages">Message</label>
                  <textarea
                    class="w-full leading-5 relative py-3 px-5 rounded text-gray-800 bg-white border-b border-gray-100 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-gray-600"
                    name="message" rows="10" id="messages"></textarea>
                  <div class="validate"></div>
                </div>
                <div class="text-center mb-6">
                  <a class="py-2.5 px-10 inline-block text-center leading-normal text-gray-100 bg-black border border-black hover:text-white hover:ring-0 focus:outline-none focus:ring-0"
                    href="#project">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" class="inline-block mr-1"
                      fill="currentColor" viewBox="0 0 512 512">
                      <rect x="48" y="96" width="416" height="320" rx="40" ry="40"
                        style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" />
                      <polyline points="112 160 256 272 400 160"
                        style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" />
                    </svg>
                    Send message
                  </a>
                </div>
              </form><!-- end contact form -->
            </div>
          </div>
        </div>
      </div>
    </div><!-- End contact -->
  </main><!-- end main -->
</template>


