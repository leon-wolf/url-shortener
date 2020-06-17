new Vue({
  el: '#app',
  data: {
    url: '',
    slug: '',
    error: '',
    formVisible: true,
    created: null,
    mode: 'new',
  },
  methods: {
    setMode(mode) {
      this.mode = mode;
    },
    async checkSlug() {
      this.error = '';
      const response = await fetch(`/${this.slug}/info`, {
        method: 'GET',
        headers: {
          'content-type': 'appliation/json',
        },
      });
      if (response.ok) {
        const result = await response.json();
        this.count = result.count;
      } else if (response.status === 429) {
        this.error = 'You re sending too many requests. ' +
       'Try again in 30 seconds.';
      } else {
        const result = await reponse.json();
        this.error = result.message;
      }
    },
    async createUrl() {
      this.error = '';
      const response = await fetch('/url', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          url: this.url,
          slug: this.slug || undefined,
        }),
      });
      if (response.ok) {
        const result = await response.json();
        this.formVisible = false;
        this.created = `${window.location.href}${result.slug}`;
      } else if (response.status === 429) {
        this.error = 'You are sending too many requests. ' +
        'Try again in 30 seconds.';
      } else {
        const result = await response.json();
        this.error = result.message;
      }
    },
  },
});
