import React from 'react';
import { ImagePickerComponent } from '.';
import { Image } from 'react-bootstrap'; 
import { shallow, mount } from 'enzyme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { act } from 'react-dom/test-utils';

describe('image picker unit', () => {
  const imageUrlList = [
    'http://image1',
    'http://image2',
    'http://image3',
  ];

  it('raw render', () => {
    const wrapper = shallow(<ImagePickerComponent
      imageUrlList={imageUrlList}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onImageChange={() => {}}
    />);
    expect(wrapper.find(FontAwesomeIcon).at(0).prop('icon'))
      .toEqual(faAngleLeft);
    expect(wrapper.find(FontAwesomeIcon).at(1).prop('icon'))
      .toEqual(faAngleRight);
    expect(wrapper.exists(Image as any));
  });

  it('on click next image', () => {
    let _image = imageUrlList[0];
    let _index = 0;
    const imageChangeMock = jest.fn((url, index) => {
      _image = url;
      _index = index;
    });
    const wrapper = shallow(<ImagePickerComponent
      imageUrlList={imageUrlList}
      onImageChange={imageChangeMock}
    />);

    act(() => {
      wrapper.find(FontAwesomeIcon).at(1).simulate('click');
    });
    expect(imageChangeMock).toHaveBeenCalledTimes(1);
    expect(_index).toEqual(1);
    expect(_image).toEqual(imageUrlList[1]);
    expect(wrapper.find(Image as any).prop('src'))
      .toEqual(_image);
  });

  it('on click prev image', () => {
    let _image = imageUrlList[0];
    let _index = 0;
    const imageChangeMock = jest.fn((url, index) => {
      _image = url;
      _index = index;
    });
    const wrapper = shallow(<ImagePickerComponent
      imageUrlList={imageUrlList}
      onImageChange={imageChangeMock}
    />);

    act(() => {
      wrapper.find(FontAwesomeIcon).at(0).simulate('click');
    });
    expect(imageChangeMock).toHaveBeenCalledTimes(0);

    act(() => {
      wrapper.find(FontAwesomeIcon).at(1).simulate('click'); // next
      wrapper.find(FontAwesomeIcon).at(1).simulate('click'); // next
      wrapper.find(FontAwesomeIcon).at(0).simulate('click'); // prev
    });

    expect(imageChangeMock).toHaveBeenCalledTimes(3);
    expect(_index).toEqual(1);
    expect(_image).toEqual(imageUrlList[1]);
    expect(wrapper.find(Image as any).prop('src'))
      .toEqual(_image);
  });

  it('initial image url', () => {
    const wrapper = mount(<ImagePickerComponent
      imageUrlList={imageUrlList}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onImageChange={() => {}}
      initialImageUrl={imageUrlList[2]}
    />);

    expect(wrapper.find(Image as any).prop('src'))
      .toEqual(imageUrlList[2]);
  });
});
