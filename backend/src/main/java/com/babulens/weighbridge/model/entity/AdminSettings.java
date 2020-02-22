package com.babulens.weighbridge.model.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Objects;

@Entity
public class AdminSettings {
	@Id
	private String key;
	private String value;

	public AdminSettings() {
	}

	public AdminSettings(String key, Object value) {
		this.key = key;
		this.value = value.toString();
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getValue() {
		return value;
	}

	public void setValue(Object value) {
		this.value = value.toString();
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (o == null || getClass() != o.getClass()) {
			return false;
		}
		AdminSettings settings = (AdminSettings) o;
		return Objects.equals(key, settings.key);
	}

	@Override
	public int hashCode() {
		return Objects.hash(key);
	}

}
