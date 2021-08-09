import React, { useState, useEffect } from 'react';
import { useStateMachine } from 'little-state-machine';
import { useForm, Controller } from 'react-hook-form';
import { Row, Col, Input, InputNumber, Button, Select, Checkbox } from 'antd';
import { cabaLocations } from 'static/data/caba-locations'
import InputIncDec from 'components/UI/InputIncDec/InputIncDec';
import FormControl from 'components/UI/FormControl/FormControl';
import AddListingAction from './AddListingAction';
import { FormHeader, Title, FormContent, FormAction } from './AddListing.style';

const BasicInformation = ({ setStep }) => {
  const { Option } = Select;
  const { action, state } = useStateMachine(AddListingAction);
  const { control, register, errors, setValue, handleSubmit } = useForm();
  const [quantity, setQuantity] = useState({
    spaces: 0,
    rooms: 0,
    bathrooms: 0,
    living: 0,
    kitchens: 0,
    size: 0
  });
  const operations = ['Alquiler', 'Alquiler temporal', 'Vender']
  const properties = ['Casa', 'Departamento', 'PH', 'Habitacion', 'Local', 'Parking']
  //useEffect(() => {
  //  register({ name: 'locality' }, { required: true });
  //  register({ name: 'operation' }, { required: true });
  //  register({ name: 'property' }, { required: true });
  //  register({ name: 'area' }, { required: true });
  //  register({ name: 'price' }, { required: true });
  //  register({ name: 'street' }, { required: true });
  //  register({ name: 'floor' }, { required: true });
  //  register({ name: 'size' }, { required: true });
  //  register({ name: 'number' }, { required: true });
  //}, [register]);
  
  const handleChange = (key) => (value) => {
    setValue([key], value);
  }
  const handleOnChange = (key) => (event) => {
    setQuantity({
      ...quantity,
      [key]: event.target.value,
    });
    setValue([key], event.target.value);
  };

  const handleIncrement = (key) => {
    setQuantity({
      ...quantity,
      [key]: ++quantity[key],
    });
    setValue([key], ++quantity[key]);
  };

  const handleDecrement = (key) => {
    if (quantity[key] <= 0) {
      return false;
    }
    setQuantity({
      ...quantity,
      [key]: --quantity[key],
    });
    setValue([key], --quantity[key]);
  };

  const onSubmit = (data) => {
    action(data);
    setStep(2);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormContent>
        <FormHeader>
          <Title>Agregar Propiedad</Title>
        </FormHeader>
        <h2>Direccion</h2>
        <Row gutter={30}>
          <Col sm={12}>

          <FormControl
              label="Pais"
              htmlFor="country"
              error={errors.country && <span>This field is required!</span>}
            >
            <Select defaultValue="Argentina" style={{ width: 250 }} disabled>
            </Select>
          </FormControl>
          <FormControl
            label="Provincia"
            htmlFor="province"
            error={errors.province && <span>This field is required!</span>}
            >
            <Select defaultValue="CABA" style={{ width: 250 }} disabled>
            </Select>
          </FormControl>
          <FormControl
            label="Localidad"
            htmlFor="locality"
            name="locality"
            error={errors.locality && <span>This field is required!</span>}
            >
            <Select defaultValue="Seleccione" style={{ width: 250 }} onChange={handleChange('locality')}>
            { cabaLocations.map(location => {
              return <Option value={location} key={location}>{location}</Option>
            })}
            </Select>
          </FormControl>
          <FormControl
            label="Operacion"
            htmlFor="operation"
            error={errors.operation && <span>This field is required!</span>}
            >
            <Select defaultValue="Seleccione" style={{ width: 250 }} onChange={handleChange('operation')}>
            { operations.map(operation => {
              return <Option value={operation} key={operation}>{operation}</Option>
            })}
            </Select>
          </FormControl>
          <FormControl
            label="Tipo de propiedad"
            htmlFor="property"
            name="province"
            error={errors.property && <span>This field is required!</span>}
            >
            <Select defaultValue="Seleccione" style={{ width: 250 }} onChange={handleChange('property')}>
            { properties.map(property => {
              return <Option value={property} key={property}>{property}</Option>
            })}
            </Select>
          </FormControl>
          </Col>
          <Col sm={12}>
          <FormControl
              label="Calle"
              htmlFor="stret"
              error={errors.street && <span>This field is required!</span>}
            >
              <Controller
                as={<Input />}
                id="street"
                name="street"
                defaultValue={state.data.street}
                control={control}
                placeholder="Ejemplo: Chaco"
                rules={{
                  required: true,
                }}
                style={{ width: 250 }}
              />
            </FormControl>
            <FormControl
              label="Numero"
              htmlFor="number"
              error={errors.number && <span>This field is required!</span>}
            >
              <Controller
                as={<Input />}
                id="number"
                name="number"
                defaultValue={state.data.number}
                control={control}
                placeholder="Ejemplo: 152"
                rules={{
                  required: true,
                }}
                style={{ width: 250 }}
              />
            </FormControl>
            <FormControl
              label="Piso"
              htmlFor="floor"
              error={errors.floor && <span>This field is required!</span>}
            >
              <Controller
                as={<Input />}
                id="floor"
                name="floor"
                defaultValue={state.data.floor}
                control={control}
                placeholder="Ejemplo: 5"
                rules={{
                  required: true,
                }}
                style={{ width: 250 }}
              />
            </FormControl>
            <FormControl
              label="Precio"
              htmlFor="price"
              error={
                errors.pricePerNight && (
                  <>
                    {errors.pricePerNight?.type === 'required' && (
                      <span>This field is required!</span>
                    )}
                    {errors.pricePerNight?.type === 'pattern' && (
                      <span>Please enter only number!</span>
                    )}
                  </>
                )
              }
            >
              <Controller
                as={<Input />}
                id="price"
                name="price"
                defaultValue={state.data.price}
                control={control}
                placeholder="00.00"
                rules={{
                  required: true,
                  pattern: /^[0-9]*$/,
                }}
                style={{ width: 250 }}
              />
            </FormControl>
          </Col>
        </Row>
        <h2>Caracteristicas</h2>
        <Row gutter={30}>
          <Col sm={12}>
          <FormControl
              label="Ambientes"
              error={errors.spaces && <span>This field is required!</span>}
            >
              <InputIncDec
                name="spaces"
                value={quantity.spaces}
                onChange={handleOnChange('spaces')}
                increment={() => handleIncrement('spaces')}
                decrement={() => handleDecrement('spaces')}
              />
            </FormControl>
            <FormControl
              label="Cuartos"
              error={errors.rooms && <span>This field is required!</span>}
            >
              <InputIncDec
                name="rooms"
                value={quantity.rooms}
                onChange={handleOnChange('rooms')}
                increment={() => handleIncrement('rooms')}
                decrement={() => handleDecrement('rooms')}
              />
            </FormControl>
            <FormControl
              label="Baños"
              error={errors.bathrooms && <span>This field is required!</span>}
            >
              <InputIncDec
                name="bathrooms"
                value={quantity.bathrooms}
                onChange={handleOnChange('bathrooms')}
                increment={() => handleIncrement('bathrooms')}
                decrement={() => handleDecrement('bathrooms')}
              />
            </FormControl>
          </Col>
          <Col sm={12}>
            <FormControl
              label="Living"
              error={errors.living && <span>This field is required!</span>}
            >
              <InputIncDec
                name="living"
                value={quantity.living}
                onChange={handleOnChange('living')}
                increment={() => handleIncrement('living')}
                decrement={() => handleDecrement('living')}
              />
            </FormControl>
            <FormControl
              label="Cocina"
              error={errors.kitchens && <span>This field is required!</span>}
            >
              <InputIncDec
                name="kitchens"
                value={quantity.kitchens}
                onChange={handleOnChange('kitchens')}
                increment={() => handleIncrement('kitchens')}
                decrement={() => handleDecrement('kitchens')}
              />
            </FormControl>
            <FormControl
              label="Area (Mt)"
              error={errors.size && <span>This field is required!</span>}
            >
            <Controller
                as={<Input />}
                id="size"
                name="size"
                defaultValue={state.data.size}
                control={control}
                placeholder="Ejemplo: 52"
                rules={{
                  required: true,
                }}
                style={{ width: 250 }}
              />
            </FormControl>
          </Col>
        </Row>
      </FormContent>
      <FormAction>
        <div className="inner-wrapper">
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </div>
      </FormAction>
    </form>
  );
};

export default BasicInformation;
