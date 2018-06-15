import React from 'react'
import { shallow } from 'enzyme'
import ConnectedFolder, {Folders} from '../components/Folders';
import configureStore from 'redux-mock-store'


describe('Folders Component', () => 
{

  let wrapper;
  const mockLoginfn1 = jest.fn();
   const mockLoginfn2 = jest.fn();
 
   beforeEach(() => {
      wrapper = shallow(<Folders storeComposeMail={mockLoginfn1} requestApiData={mockLoginfn2} />)
   })

 it('Number of NavLink', () => {     
	expect(wrapper.find("NavLink")).toHaveLength(5);       
    });  

 it('click compose button', () => {     
 	const spy = jest.spyOn(Folders.prototype, 'handleCompose');
 	const nextButton =wrapper.find('NavLink').at(0)	
  	nextButton.simulate('click');   
  	expect(spy).toHaveBeenCalledTimes(1);
 	});  
});

 
describe('Testing folder component with store store',()=>{
    const initialState = {}
    const mockStore = configureStore()
    let store,container

    beforeEach(()=>{
        store = mockStore(initialState)
        container = shallow(<ConnectedFolder store={store} /> )  
    })

    it('+++ render the connected(SMART) component', () => {
       expect(container.length).toEqual(1)
    });

   
    });

