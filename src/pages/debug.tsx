import { App, Navbar, View, Page, Toolbar, Link } from "framework7-react";

export default function DebugPage() {
  return (
    <App>
      <View main url="/">
        <Page>
          {/* Top Navbar */}
          <Navbar title="Awesome App"></Navbar>
          {/* Toolbar */}
          <Toolbar bottom>
            <Link>Link 1</Link>
            <Link>Link 2</Link>
          </Toolbar>
          {/* Page Content */}
          <p>Page content goes here</p>
          <Link href="/about/">About App</Link>
        </Page>
      </View>
    </App>
  );
}
