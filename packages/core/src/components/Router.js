import React from "react";
import {
  createHashHistory,
  createBrowserHistory,
  createMemoryHistory,
  createLocation
} from "history";
import NotFound from "./Page/NotFound";

export const RouterContext = React.createContext();

export class Router extends React.Component {
  constructor(props) {
    super();
    this.history =
      typeof window === "undefined"
        ? createMemoryHistory()
        : props.useBrowserHistory
        ? createBrowserHistory()
        : createHashHistory();
    this.state = {
      location: this.history.location
    };
  }

  componentDidMount() {
    this.unlisten = this.history.listen(location => {
      this.setState({ location: location });
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    const { pages } = this.props;
    const page = pages.find(p => p.path === this.state.location.pathname) || {
      path: "/*",
      id: pages.length + 1,
      component: NotFound,
      title: "Page Not Found",
      superTitle: "Hello",
      scripts: [],
      styles: [],
      imports: {},
      hideFromMenu: true
    };
    return (
      <RouterContext.Provider
        value={{ history: this.history, location: this.state.location }}
      >
        {this.props.children({
          page
        })}
      </RouterContext.Provider>
    );
  }
}

export class Route extends React.Component {
  render() {
    const routeLocation = createLocation(this.props.path);
    return (
      <RouterContext.Consumer>
        {({ location }) => {
          return routeLocation.pathname === location.pathname ? (
            <div>
              {JSON.stringify(location)}
              {this.props.children}
            </div>
          ) : null;
        }}
      </RouterContext.Consumer>
    );
  }
}

const shouldNavigate = event =>
  !event.defaultPrevented &&
  event.button === 0 &&
  !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

export class Link extends React.Component {
  render() {
    const { getProps, href, ...props } = this.props;
    const linkLocation = createLocation(href);

    return (
      <RouterContext.Consumer>
        {({ history, location }) => {
          const isCurrent = location.pathname === linkLocation.pathname;
          const linkProps =
            typeof getProps === "function" ? getProps({ isCurrent }) : {};
          return (
            <a
              onClick={e => {
                e.preventDefault();
                history.push(linkLocation);
              }}
              {...props}
              {...linkProps}
            />
          );
        }}
      </RouterContext.Consumer>
    );
  }
}
