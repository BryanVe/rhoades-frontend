/* eslint-disable react/no-multi-comp */
import React from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import { List, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';

import { NavigationListItem } from './components';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(3),
  },
  title: {
    color: theme.palette.custom.white,
  },
}));

const NavigationList = (props) => {
  const classes = useStyles();
  const { pages, ...rest } = props;

  return (
    <List className={classes.listMenu}>
      {pages.reduce(
        (items, page) => reduceChildRoutes({ items, page, ...rest }),
        []
      )}
    </List>
  );
};

const reduceChildRoutes = (props) => {
  const { router, items, page, depth } = props;

  if (page.children) {
    const open = matchPath(router.pathname, {
      path: page.href,
      exact: false,
    });

    items.push(
      <NavigationListItem
        depth={depth}
        icon={page.icon}
        key={page.title}
        label={page.label}
        open={Boolean(open)}
        title={page.title}
      >
        <NavigationList
          depth={depth + 1}
          pages={page.children}
          router={router}
        />
      </NavigationListItem>
    );
  } else {
    items.push(
      <NavigationListItem
        depth={depth}
        href={page.href}
        icon={page.icon}
        key={page.title}
        label={page.label}
        title={page.title}
      />
    );
  }

  return items;
};

const Navigation = (props) => {
  const { title, pages, className, component: Component, ...rest } = props;

  const classes = useStyles();
  const location = useLocation();

  return (
    <Component {...rest} className={clsx(classes.root, className)}>
      {title && (
        <Typography variant="overline" className={classes.title}>
          {title}
        </Typography>
      )}
      <NavigationList depth={0} pages={pages} router={location} />
    </Component>
  );
};

export default Navigation;
