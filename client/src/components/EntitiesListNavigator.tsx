import React from 'react';
import { commonEntitiesInfo } from '../common/entitiesInfo';
import { Link } from 'react-router-dom';
import { convertToKebab } from '../common/utilities';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { ENTITY_SHOWN_NAMES } from '../common/constants';

export const EntitiesListNavigator = () => {
  return (
    <List>
      {(() => {
        const listItems = [];
        let entityName: keyof typeof commonEntitiesInfo;
        for (entityName in commonEntitiesInfo) {
          listItems.push(
            <Link
              to={`/${convertToKebab(entityName)}`}
              style={{ textDecoration: 'none', color: 'black' }}
              key={entityName}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary={ENTITY_SHOWN_NAMES[entityName]} />
                </ListItemButton>
              </ListItem>
            </Link>,
          );
        }
        return listItems;
      })()}
    </List>
  );
};
