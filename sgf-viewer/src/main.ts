import './css/bootstrap.scss'
import './css/app.css'
import './css/sanitize/assets.css'
import './css/sanitize/forms.css'
import './css/sanitize/reduce-motion.css'
import './css/sanitize/sanitize.css'
import './css/sanitize/system-ui.css'
import './css/sanitize/typography.css'
import './css/sanitize/ui-monospace.css'
import App from './App.svelte'

const app = new App({
  target: document.getElementById('app')
})

export default app
