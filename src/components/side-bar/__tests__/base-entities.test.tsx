import React from 'react';
import { shallow } from 'enzyme';
import { BaseEntitiesList } from '../base-entities';
import { clientsMock } from '../../../__mocks__/entitites';

describe('base entites list and entity click', () => {
  it('without previous list and on menu click', () => {
    const props: React.ComponentProps<typeof BaseEntitiesList> = {
      listName: 'test name',
      entities: clientsMock,
      addEntityComponent: <div>add comp</div>,
      entityClickHandler: jest.fn(),
    };
    const wrapper = shallow(<BaseEntitiesList
      {...props}
    />);

    const controlMenu = wrapper.find('ul').at(0);
    expect(controlMenu.find('p').text()).toEqual(props.listName);
    expect(controlMenu.find('button').text())
      .toContain('В меню');

    const entitiesMenu = wrapper.find('ul').at(1);
    expect(entitiesMenu.find('button')).toHaveLength(2);
    expect(entitiesMenu.find('button').at(0).text())
      .toEqual(clientsMock[0].name);
    expect(entitiesMenu.find('button').at(0).text())
      .toEqual(clientsMock[1].name);
    expect(entitiesMenu.contains(props.addEntityComponent as any)).toBeTruthy();

    entitiesMenu.find('button').at(0).simulate('click');
    expect(props.entityClickHandler).toHaveBeenCalledTimes(1);
    expect(props.entityClickHandler).toHaveBeenCalledWith(clientsMock[0]);
  });

  it('with previous list', () => {
    const props: React.ComponentProps<typeof BaseEntitiesList> = {
      listName: 'test name',
      entities: clientsMock,
      addEntityComponent: <div>add comp</div>,
      entityClickHandler: jest.fn(),
      previousListName: 'prev list name',
      moveToPreviousList: jest.fn(),
    };
    const wrapper = shallow(<BaseEntitiesList
      {...props}
    />);

    const controlMenu = wrapper.find('ul').at(0);
    const prevButton = controlMenu.find('li').at(1).find('button');
    expect(prevButton.text()).toContain(props.previousListName);
    prevButton.simulate('click');
    expect(props.moveToPreviousList).toHaveBeenCalledTimes(1);
  });
});
