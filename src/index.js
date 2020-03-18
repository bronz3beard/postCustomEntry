/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import {
  DisplayText,
  Paragraph,
  SectionHeading,
  TextInput,
  Textarea,
  FieldGroup,
  RadioButtonField,
  Form
} from '@contentful/forma-36-react-components';
import { init, locations } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import '@contentful/forma-36-fcss/dist/styles.css';
import './index.css';

/**
 * To use this demo create a Content Type with the following fields:
 *  title: Short text
 *  body: Long text
 *  hasReport: Boolean
 *  reportUrl: Short text
 *
 *  See https://github.com/contentful/create-contentful-extension/blob/master/docs/examples/entry-editor-content-model.json for details.
 */

export class App extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      title: props.sdk.entry.fields.title.getValue() || '',
      body: props.sdk.entry.fields.body.getValue() || '',
      reportUrl:
        (props.sdk.entry.fields.reportUrl && props.sdk.entry.fields.reportUrl.getValue()) || '',
      hasReport: props.sdk.entry.fields.hasReport.getValue() || false,
      typeSelect:
        (props.sdk.entry.fields.typeSelect && props.sdk.entry.fields.typeSelect.getValue()) || '',
      tagSelect:
        (props.sdk.entry.fields.tagSelect && props.sdk.entry.fields.tagSelect.getValue()) || '',
      reportTypes:
        (props.sdk.entry.fields.reportTypes && props.sdk.entry.fields.reportTypes.getValue()) || '',
      reportPdf: props.sdk.entry.fields.reportPdf && props.sdk.entry.fields.reportPdf.getValue()
    };
  }

  onTitleChangeHandler = event => {
    const title = event.target.value;
    this.setState({ title });
    this.props.sdk.entry.fields.title.setValue(title);
  };

  onBodyChangeHandler = event => {
    const body = event.target.value;
    this.setState({ body });
    this.props.sdk.entry.fields.body.setValue(body);
  };

  onReportChangeHandler = event => {
    const reportUrl = event.target.value;
    this.setState({ reportUrl });
    this.props.sdk.entry.fields.reportUrl.setValue(reportUrl);
  };

  onHasReportChangeHandler = event => {
    const hasReport = event.target.value === 'yes';
    this.setState({ hasReport });
    this.props.sdk.entry.fields.hasReport.setValue(hasReport);
  };

  handleContentTypeSelected = event => {
    const typeSelect = event.target.value;
    this.setState({ typeSelect });
    this.props.sdk.entry.fields.typeSelect.setValue(typeSelect);
  };

  handleContentTagSelected = () => {
    const tagSelect = event.target.value;
    this.setState({ tagSelect });
    this.props.sdk.entry.fields.tagSelect.setValue(tagSelect);
  };

  onSelectedValueChangeHandler = event => {
    const reportTypes = event.target.value;
    console.log('App -> reportTypes', reportTypes);
    this.setState({ reportTypes });
    this.props.sdk.fields.reportTypes.setValue(reportTypes);
  };
  // this.props.sdk.field.setValue(
  //       {
  //         sys: {
  //           type: 'Link',
  //           linkType: 'Entry',
  //           id: assetId
  //         }
  //       },
  //       this.findProperLocale()
  //     );
  //   };
  handleTagSelect = event => {
    const value = event.target.value;
    console.log('handleTagSelect -> value', value);
    this.props.sdk.entry.fields.reportPdf.setValue({
      sys: {
        id: this.props.sdk.entry.fields.sys.id,
        linkType: 'Asset',
        type: 'Link'
      }
    });
  };

  render() {
    const { title, body, hasReport, reportUrl, typeSelect, tagSelect, reportTypes } = this.state;
    console.log('render -> reportTypes', reportTypes);
    console.log('render -> tagSelect', tagSelect);
    console.log('render -> typeSelect', typeSelect);

    return (
      <Form className="f36-margin--l">
        <DisplayText>Entry extension demo</DisplayText>
        <Paragraph>
          This demo uses a single UI Extension to render the whole editor for an entry.
        </Paragraph>
        <SectionHeading>Title</SectionHeading>
        <TextInput testId="field-title" onChange={this.onTitleChangeHandler} value={title} />

        <SectionHeading>Content Types</SectionHeading>
        <select
          id="Content Types"
          onBlur={this.handleContentTypeSelected}
          onChange={this.handleContentTypeSelected}
          className="Select__Select___31Z46 a11y__focus-border--default___60AXp">
          <option value="" disabled selected>
            Choose a value...
          </option>
          <option value="Long Form">Long Form</option>
          <option value="ShortForm">Short Form</option>
        </select>

        <SectionHeading>Content Tags</SectionHeading>
        <select
          id="Content Tags"
          onChange={this.handleContentTagSelected}
          onBlur={this.handleContentTagSelected}
          className="Select__Select___31Z46 a11y__focus-border--default___60AXp">
          <option value="" disabled selected>
            Choose a value...
          </option>
          <option value="story">story</option>
          <option value="report">report</option>
          <option value="terms">terms</option>
        </select>

        <SectionHeading>Body</SectionHeading>
        <Textarea testId="field-body" onChange={this.onBodyChangeHandler} value={body} />
        <SectionHeading>Is Report?</SectionHeading>
        <FieldGroup row={false}>
          <RadioButtonField
            labelText="Yes"
            checked={hasReport === true}
            value="yes"
            onChange={this.onHasReportChangeHandler}
            name="reportOption"
            id="yesCheckbox"
          />
          <RadioButtonField
            labelText="No"
            checked={hasReport === false}
            value="no"
            onChange={this.onHasReportChangeHandler}
            name="reportOption"
            id="noCheckbox"
          />
        </FieldGroup>
        {hasReport && (
          <>
            <SectionHeading>Report Types</SectionHeading>
            <select
              id="Report Types"
              data-test-id="dropdown-editor"
              className="Select__Select___31Z46 a11y__focus-border--default___60AXp"
              onBlur={this.onSelectedValueChangeHandler}
              onChange={this.onSelectedValueChangeHandler}>
              <option value="" selected disabled data-test-id="cf-ui-select-option">
                Choose a value
              </option>
              <option value="All reports" data-test-id="cf-ui-select-option">
                All reports
              </option>
              <option value="Annual" data-test-id="cf-ui-select-option">
                Annual
              </option>
              <option value="Financial" data-test-id="cf-ui-select-option">
                Financial
              </option>
              <option value="Interim" data-test-id="cf-ui-select-option">
                Interim
              </option>
              <option value="Research" data-test-id="cf-ui-select-option">
                Research
              </option>
            </select>
            <SectionHeading>Report Url</SectionHeading>
            <TextInput testId="reportUrl" onChange={this.onReportChangeHandler} value={reportUrl} />
          </>
        )}
      </Form>
    );
  }
}

init(sdk => {
  if (sdk.location.is(locations.LOCATION_ENTRY_EDITOR)) {
    render(<App sdk={sdk} />, document.getElementById('root'));
  }
});

/**
 * By default, iframe of the extension is fully reloaded on every save of a source file.
 * If you want to use HMR (hot module reload) instead of full reload, uncomment the following lines
 */
// if (module.hot) {
//   module.hot.accept();
// }
