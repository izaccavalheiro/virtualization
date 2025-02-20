import React from 'react';
import { Virtualization } from 'simple-virtualization';

const contentItems = [
  `
    <h2>Simple Title</h2>
    <p>This is a simple paragraph.</p>
  `,
  `
    <h1>Large Heading</h1>
    <h3>Smaller Subheading</h3>
    <p>First paragraph with some content.</p>
    <p>Second paragraph with more details about the topic.</p>
    <div class="bg-gray-200" style="height: 200px; display: flex; align-items: center; justify-content: center;">
      Image Placeholder 200x200
    </div>
  `,
`
    <div class="bg-gray-200" style="height: 300px; display: flex; align-items: center; justify-content: center;">
      Hero Image Placeholder
    </div>
    <h2>Title After Image</h2>
    <p>Content following a large image.</p>
  `,
  `
    <h2>Grid Layout</h2>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
      <div class="bg-gray-200" style="height: 150px; display: flex; align-items: center; justify-content: center;">
        Image 1
      </div>
      <div class="bg-gray-200" style="height: 150px; display: flex; align-items: center; justify-content: center;">
        Image 2
      </div>
      <div class="bg-gray-200" style="height: 150px; display: flex; align-items: center; justify-content: center;">
        Image 3
      </div>
      <div class="bg-gray-200" style="height: 150px; display: flex; align-items: center; justify-content: center;">
        Image 4
      </div>
    </div>
  `,`
    <h3>Small Update</h3>
    <p>A brief update message.</p>
  `,
  `
    <h2>Simple Title</h2>
    <p>This is a simple paragraph.</p>
  `,
  `
    <h1>Large Heading</h1>
    <h3>Smaller Subheading</h3>
    <p>First paragraph with some content.</p>
    <p>Second paragraph with more details about the topic.</p>
    <div class="bg-gray-200" style="height: 200px; display: flex; align-items: center; justify-content: center;">
      Image Placeholder 200x200
    </div>
  `,
`
    <div class="bg-gray-200" style="height: 300px; display: flex; align-items: center; justify-content: center;">
      Hero Image Placeholder
    </div>
    <h2>Title After Image</h2>
    <p>Content following a large image.</p>
  `,
  `
    <h2>Grid Layout</h2>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
      <div class="bg-gray-200" style="height: 150px; display: flex; align-items: center; justify-content: center;">
        Image 1
      </div>
      <div class="bg-gray-200" style="height: 150px; display: flex; align-items: center; justify-content: center;">
        Image 2
      </div>
      <div class="bg-gray-200" style="height: 150px; display: flex; align-items: center; justify-content: center;">
        Image 3
      </div>
      <div class="bg-gray-200" style="height: 150px; display: flex; align-items: center; justify-content: center;">
        Image 4
      </div>
    </div>
  `,`
    <h3>Small Update</h3>
    <p>A brief update message.</p>
  `,
  `
    <h2>Simple Title</h2>
    <p>This is a simple paragraph.</p>
  `,
  `
    <h1>Large Heading</h1>
    <h3>Smaller Subheading</h3>
    <p>First paragraph with some content.</p>
    <p>Second paragraph with more details about the topic.</p>
    <div class="bg-gray-200" style="height: 200px; display: flex; align-items: center; justify-content: center;">
      Image Placeholder 200x200
    </div>
  `,
`
    <div class="bg-gray-200" style="height: 300px; display: flex; align-items: center; justify-content: center;">
      Hero Image Placeholder
    </div>
    <h2>Title After Image</h2>
    <p>Content following a large image.</p>
  `,
  `
    <h2>Grid Layout</h2>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
      <div class="bg-gray-200" style="height: 150px; display: flex; align-items: center; justify-content: center;">
        Image 1
      </div>
      <div class="bg-gray-200" style="height: 150px; display: flex; align-items: center; justify-content: center;">
        Image 2
      </div>
      <div class="bg-gray-200" style="height: 150px; display: flex; align-items: center; justify-content: center;">
        Image 3
      </div>
      <div class="bg-gray-200" style="height: 150px; display: flex; align-items: center; justify-content: center;">
        Image 4
      </div>
    </div>
  `,`
    <h3>Small Update</h3>
    <p>A brief update message.</p>
  `,
  `
    <h2>Simple Title</h2>
    <p>This is a simple paragraph.</p>
  `,
  `
    <h1>Large Heading</h1>
    <h3>Smaller Subheading</h3>
    <p>First paragraph with some content.</p>
    <p>Second paragraph with more details about the topic.</p>
    <div class="bg-gray-200" style="height: 200px; display: flex; align-items: center; justify-content: center;">
      Image Placeholder 200x200
    </div>
  `,
`
    <div class="bg-gray-200" style="height: 300px; display: flex; align-items: center; justify-content: center;">
      Hero Image Placeholder
    </div>
    <h2>Title After Image</h2>
    <p>Content following a large image.</p>
  `,
  `
    <h2>Grid Layout</h2>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
      <div class="bg-gray-200" style="height: 150px; display: flex; align-items: center; justify-content: center;">
        Image 1
      </div>
      <div class="bg-gray-200" style="height: 150px; display: flex; align-items: center; justify-content: center;">
        Image 2
      </div>
      <div class="bg-gray-200" style="height: 150px; display: flex; align-items: center; justify-content: center;">
        Image 3
      </div>
      <div class="bg-gray-200" style="height: 150px; display: flex; align-items: center; justify-content: center;">
        Image 4
      </div>
    </div>
  `,`
    <h3>Small Update</h3>
    <p>A brief update message.</p>
  `,
  `
    <h2>Simple Title</h2>
    <p>This is a simple paragraph.</p>
  `,
  `
    <h1>Large Heading</h1>
    <h3>Smaller Subheading</h3>
    <p>First paragraph with some content.</p>
    <p>Second paragraph with more details about the topic.</p>
    <div class="bg-gray-200" style="height: 200px; display: flex; align-items: center; justify-content: center;">
      Image Placeholder 200x200
    </div>
  `,
`
    <div class="bg-gray-200" style="height: 300px; display: flex; align-items: center; justify-content: center;">
      Hero Image Placeholder
    </div>
    <h2>Title After Image</h2>
    <p>Content following a large image.</p>
  `,
  `
    <h2>Grid Layout</h2>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
      <div class="bg-gray-200" style="height: 150px; display: flex; align-items: center; justify-content: center;">
        Image 1
      </div>
      <div class="bg-gray-200" style="height: 150px; display: flex; align-items: center; justify-content: center;">
        Image 2
      </div>
      <div class="bg-gray-200" style="height: 150px; display: flex; align-items: center; justify-content: center;">
        Image 3
      </div>
      <div class="bg-gray-200" style="height: 150px; display: flex; align-items: center; justify-content: center;">
        Image 4
      </div>
    </div>
  `,`
    <h3>Small Update</h3>
    <p>A brief update message.</p>
  `,
  `
    <h2>Simple Title</h2>
    <p>This is a simple paragraph.</p>
  `,
  `
    <h1>Large Heading</h1>
    <h3>Smaller Subheading</h3>
    <p>First paragraph with some content.</p>
    <p>Second paragraph with more details about the topic.</p>
    <div class="bg-gray-200" style="height: 200px; display: flex; align-items: center; justify-content: center;">
      Image Placeholder 200x200
    </div>
  `,
`
    <div class="bg-gray-200" style="height: 300px; display: flex; align-items: center; justify-content: center;">
      Hero Image Placeholder
    </div>
    <h2>Title After Image</h2>
    <p>Content following a large image.</p>
  `,
  `
    <h2>Grid Layout</h2>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
      <div class="bg-gray-200" style="height: 150px; display: flex; align-items: center; justify-content: center;">
        Image 1
      </div>
      <div class="bg-gray-200" style="height: 150px; display: flex; align-items: center; justify-content: center;">
        Image 2
      </div>
      <div class="bg-gray-200" style="height: 150px; display: flex; align-items: center; justify-content: center;">
        Image 3
      </div>
      <div class="bg-gray-200" style="height: 150px; display: flex; align-items: center; justify-content: center;">
        Image 4
      </div>
    </div>
  `,`
    <h3>Small Update</h3>
    <p>A brief update message.</p>
  `,
  `
    <h2>Simple Title</h2>
    <p>This is a simple paragraph.</p>
  `,
  `
    <h1>Large Heading</h1>
    <h3>Smaller Subheading</h3>
    <p>First paragraph with some content.</p>
    <p>Second paragraph with more details about the topic.</p>
    <div class="bg-gray-200" style="height: 200px; display: flex; align-items: center; justify-content: center;">
      Image Placeholder 200x200
    </div>
  `,
`
    <div class="bg-gray-200" style="height: 300px; display: flex; align-items: center; justify-content: center;">
      Hero Image Placeholder
    </div>
    <h2>Title After Image</h2>
    <p>Content following a large image.</p>
  `,
  `
    <h2>Grid Layout</h2>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
      <div class="bg-gray-200" style="height: 150px; display: flex; align-items: center; justify-content: center;">
        Image 1
      </div>
      <div class="bg-gray-200" style="height: 150px; display: flex; align-items: center; justify-content: center;">
        Image 2
      </div>
      <div class="bg-gray-200" style="height: 150px; display: flex; align-items: center; justify-content: center;">
        Image 3
      </div>
      <div class="bg-gray-200" style="height: 150px; display: flex; align-items: center; justify-content: center;">
        Image 4
      </div>
    </div>
  `,`
    <h3>Small Update</h3>
    <p>A brief update message.</p>
  `,
  `
    <h2>Simple Title</h2>
    <p>This is a simple paragraph.</p>
  `,
  `
    <h1>Large Heading</h1>
    <h3>Smaller Subheading</h3>
    <p>First paragraph with some content.</p>
    <p>Second paragraph with more details about the topic.</p>
    <div class="bg-gray-200" style="height: 200px; display: flex; align-items: center; justify-content: center;">
      Image Placeholder 200x200
    </div>
  `,
`
    <div class="bg-gray-200" style="height: 300px; display: flex; align-items: center; justify-content: center;">
      Hero Image Placeholder
    </div>
    <h2>Title After Image</h2>
    <p>Content following a large image.</p>
  `,
  `
    <h2>Grid Layout</h2>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
      <div class="bg-gray-200" style="height: 150px; display: flex; align-items: center; justify-content: center;">
        Image 1
      </div>
      <div class="bg-gray-200" style="height: 150px; display: flex; align-items: center; justify-content: center;">
        Image 2
      </div>
      <div class="bg-gray-200" style="height: 150px; display: flex; align-items: center; justify-content: center;">
        Image 3
      </div>
      <div class="bg-gray-200" style="height: 150px; display: flex; align-items: center; justify-content: center;">
        Image 4
      </div>
    </div>
  `,`
    <h3>Small Update</h3>
    <p>A brief update message.</p>
  `,
  `
    <h2>Simple Title</h2>
    <p>This is a simple paragraph.</p>
  `,
  `
    <h1>Large Heading</h1>
    <h3>Smaller Subheading</h3>
    <p>First paragraph with some content.</p>
    <p>Second paragraph with more details about the topic.</p>
    <div class="bg-gray-200" style="height: 200px; display: flex; align-items: center; justify-content: center;">
      Image Placeholder 200x200
    </div>
  `,
`
    <div class="bg-gray-200" style="height: 300px; display: flex; align-items: center; justify-content: center;">
      Hero Image Placeholder
    </div>
    <h2>Title After Image</h2>
    <p>Content following a large image.</p>
  `,
  `
    <h2>Grid Layout</h2>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
      <div class="bg-gray-200" style="height: 150px; display: flex; align-items: center; justify-content: center;">
        Image 1
      </div>
      <div class="bg-gray-200" style="height: 150px; display: flex; align-items: center; justify-content: center;">
        Image 2
      </div>
      <div class="bg-gray-200" style="height: 150px; display: flex; align-items: center; justify-content: center;">
        Image 3
      </div>
      <div class="bg-gray-200" style="height: 150px; display: flex; align-items: center; justify-content: center;">
        Image 4
      </div>
    </div>
  `,`
    <h3>Small Update</h3>
    <p>A brief update message.</p>
  `,
];

const CustomItem = ({ index }: { index: number }) => (
  <div>
    <h2>Custom Component {index}</h2>
    <p>This is a React component</p>
    <div>
      <div className="bg-gray-200">
        Image 1
      </div>
      <div className="bg-gray-200">
        Image 2
      </div>
      <div className="bg-gray-200">
        Image 3
      </div>
      <div className="bg-gray-200">
        Image 4
      </div>
    </div>
  </div>
);

const AnotherCustomItem = ({ index }: { index: number }) => (
  <div>
    <h2>Custom Component {index}</h2>
    <p>This is a React component</p>
    <p>This is a React component</p>
    <p>This is a React component</p>
    <p>This is a React component</p>
    <p>This is a React component</p>
    <div>
      <div>
        Image 1
      </div>
      <div>
        Image 2
      </div>
    </div>
  </div>
);

const mixedItems = [
  ...contentItems,
  '<h2>HTML Item</h2>',
  <CustomItem index={1} key="custom1" />,
  <AnotherCustomItem index={2} key="custom2" />,
  CustomItem,
  {
    component: CustomItem,
    props: { customProp: 'value' }
  },
  (props: { index: number }) => <div>Functional component {props.index}</div>,
  ...contentItems,
  '<h2>HTML Item</h2>',
  <CustomItem index={1} key="custom1" />,
  <AnotherCustomItem index={2} key="custom2" />,
  CustomItem,
  {
    component: CustomItem,
    props: { customProp: 'value' }
  },
  (props: { index: number }) => <div>Functional component {props.index}</div>,
  ...contentItems,
  '<h2>HTML Item</h2>',
  <CustomItem index={1} key="custom1" />,
  <AnotherCustomItem index={2} key="custom2" />,
  CustomItem,
  {
    component: CustomItem,
    props: { customProp: 'value' }
  },
  (props: { index: number }) => <div>Functional component {props.index}</div>,
  ...contentItems,
  '<h2>HTML Item</h2>',
  <CustomItem index={1} key="custom1" />,
  <AnotherCustomItem index={2} key="custom2" />,
  CustomItem,
  {
    component: CustomItem,
    props: { customProp: 'value' }
  },
  (props: { index: number }) => <div>Functional component {props.index}</div>,
  ...contentItems,
  '<h2>HTML Item</h2>',
  <CustomItem index={1} key="custom1" />,
  <AnotherCustomItem index={2} key="custom2" />,
  CustomItem,
  {
    component: CustomItem,
    props: { customProp: 'value' }
  },
  (props: { index: number }) => <div>Functional component {props.index}</div>,
  ...contentItems,
  '<h2>HTML Item</h2>',
  <CustomItem index={1} key="custom1" />,
  <AnotherCustomItem index={2} key="custom2" />,
  CustomItem,
  {
    component: CustomItem,
    props: { customProp: 'value' }
  },
  (props: { index: number }) => <div>Functional component {props.index}</div>,
  ...contentItems,
  '<h2>HTML Item</h2>',
  <CustomItem index={1} key="custom1" />,
  <AnotherCustomItem index={2} key="custom2" />,
  CustomItem,
  {
    component: CustomItem,
    props: { customProp: 'value' }
  },
  (props: { index: number }) => <div>Functional component {props.index}</div>,
  ...contentItems,
  '<h2>HTML Item</h2>',
  <CustomItem index={1} key="custom1" />,
  <AnotherCustomItem index={2} key="custom2" />,
  CustomItem,
  {
    component: CustomItem,
    props: { customProp: 'value' }
  },
  (props: { index: number }) => <div>Functional component {props.index}</div>,
  ...contentItems,
  '<h2>HTML Item</h2>',
  <CustomItem index={1} key="custom1" />,
  <AnotherCustomItem index={2} key="custom2" />,
  CustomItem,
  {
    component: CustomItem,
    props: { customProp: 'value' }
  },
  (props: { index: number }) => <div>Functional component {props.index}</div>,
];

export const VirtualizationExample = () => {
  // Custom styles
  const listStyles: React.CSSProperties = {
    height: '200px',
    border: '1px solid #ccc',
    borderRadius: '4px'
  };

  const itemStyles: React.CSSProperties = {
    padding: '16px',
    borderBottom: '1px solid #eee',
    backgroundColor: '#fff'
  };

  const listClasses = 'my-custom-list';
  const itemClasses = 'my-custom-item';

  return (
    <Virtualization
      items={mixedItems}
      style={listStyles}
      itemStyle={itemStyles}
      className={listClasses}
      itemClassName={itemClasses}
    />
  );
};
