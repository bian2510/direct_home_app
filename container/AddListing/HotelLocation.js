import React, { useState, useEffect } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useStateMachine } from 'little-state-machine';
import { useForm, Controller } from 'react-hook-form';
import { Row, Col, Input, Button } from 'antd';
import FormControl from 'components/UI/FormControl/FormControl';
import MapWithSearchBox from 'components/Map/MapSearchBox';
import { mapDataHelper } from 'components/Map/mapDataHelper';
import AddListingAction from './AddListingAction';
import { FormHeader, Title, FormContent, FormAction } from './AddListing.style';

const HotelLocation = ({ setStep }) => {
  let tempLocationData = [];
  const [location, setLocation] = useState([]);
  const { control, register, errors, setValue, handleSubmit } = useForm({
    mode: 'onChange',
  });
  const { action, state } = useStateMachine(AddListingAction);

  useEffect(() => {
    register({ name: 'propertyTitle' }, { required: true });
  }, [register]);

  const onSubmit = (data) => {
    action(data);
    setStep(4);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormContent>
        <FormHeader>
          <Title>Step 3: Hotel Location</Title>
        </FormHeader>
        <Row gutter={30}>
          <Col sm={12}>
            <FormControl
              label="Titulo para su propiedad"
              htmlFor="propertyTitle"
              error={
                errors.propertyTitle && (
                  <>
                    {errors.propertyTitle?.type === 'required' && (
                      <span>This field is required!</span>
                    )}
                    {errors.propertyTitle?.type === 'pattern' && (
                      <span>Please enter your valid number!</span>
                    )}
                  </>
                )
              }
            >
              <Controller
                as={<Input />}
                id="propertyTitle"
                name="propertyTitle"
                defaultValue={state.data.propertyTitle}
                control={control}
                placeholder="Monoambiente muy luminoso"
                rules={{
                  required: true,
                }}
              />
            </FormControl>
          </Col>
        </Row>
        <FormControl
          label="Descripcion de la propiedad"
          htmlFor="propertyDescription"
          error={
            errors.propertyDescription && <span>This field is required!</span>
          }
        >
          <Controller
            as={<Input.TextArea rows={5} />}
            id="propertyDescription"
            name="propertyDescription"
            defaultValue={state.data.propertyDescription}
            control={control}
            placeholder="Escriba una descripcion detallada de su propiedad"
            rules={{
              required: true,
            }}
          />
        </FormControl>
        <FormControl
          error={errors.locationData && <span>This field is required!</span>}
        >
          <MapWithSearchBox
            name="locationData"
            updatevalue={(value) => {
              tempLocationData = mapDataHelper(value);
              setValue('locationData', tempLocationData);
              setLocation(value);
            }}
          />
        </FormControl>
      </FormContent>
      <FormAction>
        <div className="inner-wrapper">
          <Button
            className="back-btn"
            htmlType="button"
            onClick={() => setStep(2)}
          >
            <IoIosArrowBack /> Back
          </Button>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </div>
      </FormAction>
    </form>
  );
};

export default HotelLocation;
