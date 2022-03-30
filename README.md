<h1 class="code-line" data-line-start=0 data-line-end=1 ><a id="Coach_Finder_0"></a>Coach Finder</h1>
<h2 class="code-line" data-line-start=1 data-line-end=2 ><a id="_develop_yourself_1"></a><em>Develop yourself!</em></h2>
<p class="has-line-data" data-line-start="4" data-line-end="5">In times of pandemic, time is not to be wasted and Coach Finder, a Vue.js webapp, allows learners to find their ideal coaches to learn new skills and coaches to advertise themselves! With this app, you can:</p>
<h5 class="code-line" data-line-start=5 data-line-end=6 ><a id="As_a_student_5"></a>As a student</h5>
<ul>
<li class="has-line-data" data-line-start="6" data-line-end="7">Browse all coaching offers or use filter to browse specific postings</li>
<li class="has-line-data" data-line-start="7" data-line-end="8">Contact a coach by leaving a message and your email</li>
</ul>
<h5 class="code-line" data-line-start=8 data-line-end=9 ><a id="As_a_coach_8"></a>As a coach</h5>
<ul>
<li class="has-line-data" data-line-start="9" data-line-end="10">Register as a coach and post what you want to teach and provide student level requirements and a detailed description</li>
<li class="has-line-data" data-line-start="10" data-line-end="12">Check student requests and get his/her email for further discussion</li>
</ul>
<h2 class="code-line" data-line-start=12 data-line-end=13 ><a id="Demo_12"></a>Demo</h2>
<p class="has-line-data" data-line-start="13" data-line-end="14">Here is a working live demo : <a href="https://coach-finder-fa10f.web.app">Coach Finder</a></p>
<h2 class="code-line" data-line-start=15 data-line-end=16 ><a id="Walkthrough_15"></a>Walkthrough</h2>
<p class="has-line-data" data-line-start="16" data-line-end="17">In this section, I will walk through all the important Vue.js skills I learned from this amazing <a href="https://www.udemy.com/course/vuejs-2-the-complete-guide/">online course</a>.</p>
<h3 class="code-line" data-line-start=18 data-line-end=19 ><a id="Project_Structure_18"></a>Project Structure</h3>
<p class="has-line-data" data-line-start="19" data-line-end="20"><img src="https://raw.githubusercontent.com/Elzier/coach-finder/main/public/img/screenshots/Routing.png" alt="project structure"></p>
<ul>
<li class="has-line-data" data-line-start="20" data-line-end="21">pages folder - Holds components that are loaded as pages through routing e.g. Login/Signup components</li>
<li class="has-line-data" data-line-start="21" data-line-end="22">components folder - Other components that are not loaded throgh routing, e.g. Base UI components</li>
<li class="has-line-data" data-line-start="22" data-line-end="24">store folder - Vuex modules. Split into separate modules to make each file cleaner</li>
</ul>
<h3 class="code-line" data-line-start=24 data-line-end=25 ><a id="Basic_Usage_24"></a>Basic Usage</h3>
<p class="has-line-data" data-line-start="25" data-line-end="26">Used throughout the whole project</p>
<ul>
<li class="has-line-data" data-line-start="26" data-line-end="27">Interpolations - {{ expression }}</li>
<li class="has-line-data" data-line-start="27" data-line-end="28">Directives - :show, v-if, v-else, v-model …</li>
<li class="has-line-data" data-line-start="28" data-line-end="29">Passing data between child and parent components - props and custom events</li>
<li class="has-line-data" data-line-start="29" data-line-end="30">Slots (source: src/components/ui/BaseButton.vue)</li>
</ul>
<pre><code class="has-line-data" data-line-start="31" data-line-end="40" class="language-sh">&lt;template&gt;
  &lt;button v-if=<span class="hljs-string">"!link"</span> :class=<span class="hljs-string">"mode"</span>&gt;
    &lt;slot&gt;&lt;/slot&gt;
  &lt;/button&gt;
  &lt;router-link v-else :to=<span class="hljs-string">"to"</span> :class=<span class="hljs-string">"mode"</span>&gt;
    &lt;slot&gt;&lt;/slot&gt;
  &lt;/router-link&gt;
&lt;/template&gt;
</code></pre>
<h3 class="code-line" data-line-start=41 data-line-end=42 ><a id="Routing_41"></a>Routing</h3>
<p class="has-line-data" data-line-start="42" data-line-end="43"><img src="https://raw.githubusercontent.com/Elzier/coach-finder/main/public/img/screenshots/Structure.png" alt="routing"></p>
<ul>
<li class="has-line-data" data-line-start="43" data-line-end="44">Created routing logic using the createRouter function from vue-router module.</li>
<li class="has-line-data" data-line-start="44" data-line-end="46">Used nested route for contacting a specific coach</li>
</ul>
<h3 class="code-line" data-line-start=46 data-line-end=47 ><a id="Managing_Global_States_46"></a>Managing Global States</h3>
<p class="has-line-data" data-line-start="47" data-line-end="48">Split into three types of modules and using namespace. (source: src/store/index.js)</p>
<pre><code class="has-line-data" data-line-start="49" data-line-end="58" class="language-sh">import coachesModule from <span class="hljs-string">'./modules/coaches/index.js'</span>
//...
const store = createStore({
  modules: {
    coaches: coachesModule,
    //...
  },
});
</code></pre>
<p class="has-line-data" data-line-start="58" data-line-end="59">Each type of module has an entry index.js that stores states and imports mutations, actions and getters</p>
<pre><code class="has-line-data" data-line-start="60" data-line-end="72" class="language-sh">import mutations from <span class="hljs-string">'./mutations.js'</span>;
import actions from <span class="hljs-string">'./actions.js'</span>;
import getters from <span class="hljs-string">'./getters.js'</span>;

<span class="hljs-built_in">export</span> default {
<span class="hljs-function"><span class="hljs-title">state</span></span>() {<span class="hljs-built_in">return</span> {//...};
},
mutations,
actions,
getters
}
</code></pre>
<p class="has-line-data" data-line-start="72" data-line-end="73">Used getters to hide state accessing logic. (source: src/store/modules/coaches/getter.js)</p>
<pre><code class="has-line-data" data-line-start="74" data-line-end="80" class="language-sh">  isCoach(_, getters, _2, rootGetters) {
    const coaches = getters.coaches;
    const userId = rootGetters.userId;
    <span class="hljs-built_in">return</span> coaches.some(coach =&gt; coach.id === userId);
  },
</code></pre>
<p class="has-line-data" data-line-start="80" data-line-end="81">Used mutations to modify states. (source: src/store/modules/requests/mutations.js)</p>
<pre><code class="has-line-data" data-line-start="82" data-line-end="86" class="language-sh">  addRequest(state, payload) {
    state.requests.push(payload);
  },
</code></pre>
<p class="has-line-data" data-line-start="86" data-line-end="87">Used actions for asynchronous logics and committing mutations. (source: src/store/modules/requests/actions.js)</p>
<pre><code class="has-line-data" data-line-start="88" data-line-end="98" class="language-sh">async contactCoach(context, payload) {
    //...
    const response = await fetch(someURL, {
      method: <span class="hljs-string">'POST'</span>,
      body: JSON.stringify(newRequest)
    });
    //...
    context.commit(<span class="hljs-string">'addRequest'</span>, newRequest);
  },
</code></pre>
<h3 class="code-line" data-line-start=99 data-line-end=100 ><a id="Communicating_With_Backend_99"></a>Communicating With Backend</h3>
<ul>
<li class="has-line-data" data-line-start="100" data-line-end="101">Set up a Firebase database</li>
<li class="has-line-data" data-line-start="101" data-line-end="102">Used javascript built-in fetch() function to send http requests</li>
</ul>
<pre><code class="has-line-data" data-line-start="103" data-line-end="109" class="language-sh">const response = await fetch(url, {
        method: <span class="hljs-string">'PUT'</span>,
        body: JSON.stringify(coachData)
      }
    );
</code></pre>
<h3 class="code-line" data-line-start=110 data-line-end=111 ><a id="Adding_Animations_and_Transitions_110"></a>Adding Animations and Transitions</h3>
<p class="has-line-data" data-line-start="111" data-line-end="112">(source: src/components/ui/BaseDialog.vue)</p>
<pre><code class="has-line-data" data-line-start="113" data-line-end="119" class="language-sh">&lt;transition name=<span class="hljs-string">"dialog"</span>&gt;
    &lt;dialog open v-if=<span class="hljs-string">"show"</span>&gt;
      //...
    &lt;/dialog&gt;
&lt;/transition&gt;
</code></pre>
<pre><code class="has-line-data" data-line-start="121" data-line-end="138" class="language-sh">.dialog-enter-from,
.dialog-leave-to {
  opacity: <span class="hljs-number">0</span>;
  transform: scale(<span class="hljs-number">0.8</span>);
}
.dialog-enter-active {
  transition: all <span class="hljs-number">0.3</span>s ease-out;
}
.dialog-leave-active {
  transition: all <span class="hljs-number">0.3</span>s ease-in;
}
.dialog-enter-to,
.dialog-leave-from {
  opacity: <span class="hljs-number">1</span>;
  transform: scale(<span class="hljs-number">1</span>);
}
</code></pre>
<h3 class="code-line" data-line-start=139 data-line-end=140 ><a id="Authentication_139"></a>Authentication</h3>
<ul>
<li class="has-line-data" data-line-start="140" data-line-end="141">Using Firebase authentication</li>
<li class="has-line-data" data-line-start="141" data-line-end="142">Lock resources based on user logged in or not</li>
<li class="has-line-data" data-line-start="142" data-line-end="143">Add navigation guards (source: src/router.js)</li>
</ul>
<pre><code class="has-line-data" data-line-start="144" data-line-end="154" class="language-sh">router.beforeEach(<span class="hljs-keyword">function</span> (to, _, next) {
  <span class="hljs-keyword">if</span> (to.meta.requiresAuth &amp;&amp; !store.getters.isAuthenticated) {
    next(<span class="hljs-string">'/auth'</span>);
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (to.meta.requiresUnauth &amp;&amp; store.getters.isAuthenticated) {
    next(<span class="hljs-string">'/coaches'</span>);
  } <span class="hljs-keyword">else</span> {
    next();
  }
});
</code></pre>
<h3 class="code-line" data-line-start=155 data-line-end=156 ><a id="Optimization_155"></a>Optimization</h3>
<p class="has-line-data" data-line-start="156" data-line-end="157">Add lazy loading (source: src/main.js)</p>
<pre><code class="has-line-data" data-line-start="158" data-line-end="161" class="language-sh">const BaseDialog = defineAsyncComponent(() =&gt; 
    import(<span class="hljs-string">'./components/ui/BaseDialog.vue'</span>));
</code></pre>
<h2 class="code-line" data-line-start=162 data-line-end=163 ><a id="Setup_162"></a>Setup</h2>
<p class="has-line-data" data-line-start="164" data-line-end="165">Install the dependencies and devDependencies and run in development environment.</p>
<pre><code class="has-line-data" data-line-start="167" data-line-end="170" class="language-sh">npm install
npm run serve
</code></pre>
