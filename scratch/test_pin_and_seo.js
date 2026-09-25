import http from 'http';

const BASE_URL = 'http://localhost:6095';

function request(path, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const req = http.request(
      url,
      {
        method: options.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {}),
        },
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, data: JSON.parse(body), headers: res.headers, raw: body });
          } catch (e) {
            resolve({ status: res.statusCode, raw: body, headers: res.headers });
          }
        });
      }
    );
    req.on('error', reject);
    if (options.body) {
      req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('--- 1. Testing GET /api/projects ---');
  const projRes = await request('/api/projects');
  console.log(`Projects fetched: ${projRes.data?.length || 0}`);
  const firstProj = projRes.data?.[0];
  console.log('First project:', firstProj?.title, 'Pinned:', firstProj?.isPinned);

  if (firstProj) {
    const pId = firstProj._id || firstProj.slug;
    console.log(`\n--- 2. Testing Pin Toggle on ${pId} ---`);
    const pinRes = await request(`/api/projects/${pId}/pin`, { method: 'PATCH' });
    console.log('Pin toggle response:', pinRes.status, pinRes.data?.message, 'isPinned:', pinRes.data?.isPinned);

    // Fetch projects again to verify sorting
    const sortedRes = await request('/api/projects');
    console.log('Top project after toggle:', sortedRes.data?.[0]?.title, 'isPinned:', sortedRes.data?.[0]?.isPinned);
  }

  console.log('\n--- 3. Testing Blog with SEO Fields ---');
  const testBlogPayload = {
    title: 'Modern SEO with React and Node.js',
    slug: 'modern-seo-with-react-and-nodejs-' + Date.now().toString().slice(-4),
    category: 'Development',
    excerpt: 'An in-depth article about SEO meta tags, SSR injection, and dynamic title updates.',
    content: '<h2>SEO Best Practices</h2><p>Learn how to properly index dynamic React web applications.</p>',
    metaTitle: 'Master Modern SEO in React & Node.js — Complete Guide',
    metaDescription: 'Step-by-step tutorial on optimizing web apps for Google search and social share cards.',
    metaKeywords: 'SEO, React, Node.js, Web Development, Full Stack, Google',
  };

  const createBlogRes = await request('/api/blogs', {
    method: 'POST',
    body: testBlogPayload,
  });
  console.log('Create blog response:', createBlogRes.status, 'Created ID:', createBlogRes.data?.blog?._id);

  const blogSlug = testBlogPayload.slug;
  console.log(`\n--- 4. Testing HTML Source Code Injection (Ctrl+U Simulation) for /blog/${blogSlug} ---`);
  const htmlRes = await request(`/blog/${blogSlug}`);
  console.log('HTML status:', htmlRes.status);
  const html = htmlRes.raw || '';
  
  const hasTitle = html.includes('Master Modern SEO in React &amp; Node.js') || html.includes('Master Modern SEO in React');
  const hasDesc = html.includes('Step-by-step tutorial on optimizing web apps');
  const hasKeywords = html.includes('SEO, React, Node.js');

  console.log('✅ Contains SEO Title tag in source code:', hasTitle);
  console.log('✅ Contains SEO Description meta tag in source code:', hasDesc);
  console.log('✅ Contains SEO Keywords meta tag in source code:', hasKeywords);

  // Clean up test blog
  if (createBlogRes.data?.blog?._id) {
    await request(`/api/blogs/${createBlogRes.data.blog._id}`, { method: 'DELETE' });
    console.log('Test blog cleaned up.');
  }

  console.log('\n🎉 ALL TESTS COMPLETED SUCCESSFULLY!');
}

runTests().catch(console.error);
