from app import db, login_manager
from flask_login import UserMixin
from datetime import datetime, date


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(50), default='nominee')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    psq1 = db.relationship('Psq1ForeignAffection', backref='user', lazy=True)
    psq2 = db.relationship('Psq2ForeignAssociation', backref='user', lazy=True)
    psq3 = db.relationship('Psq3ForeignTravel', backref='user', lazy=True)
    psq4 = db.relationship('Psq4PersonalConduct', backref='user', lazy=True)
    psq5 = db.relationship('Psq5FinancialResponsibility', backref='user', lazy=True)

    def is_security_officer(self):
        return self.role == 'security_officer'

    def to_dict(self):
        return {'id': self.id, 'name': self.name, 'email': self.email, 'role': self.role}


class Psq1ForeignAffection(db.Model):
    __tablename__ = 'psq1_foreign_affections'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    submission_date = db.Column(db.Date, nullable=False)
    is_dual_citizen = db.Column(db.Boolean, default=False)
    dual_citizen_country = db.Column(db.String(255))
    reported_to_security_officer = db.Column(db.Boolean)
    reported_date = db.Column(db.Date)
    reported_date_estimated = db.Column(db.Boolean, default=False)
    foreign_national_name = db.Column(db.String(255), nullable=False)
    country_of_birth = db.Column(db.String(255), nullable=False)
    relationship_to_nominee = db.Column(db.String(255), nullable=False)
    citizenship_countries = db.Column(db.String(255), nullable=False)
    current_address = db.Column(db.Text, nullable=False)
    initial_contact = db.Column(db.Text, nullable=False)
    visited_us = db.Column(db.Boolean)
    last_visit_us_date = db.Column(db.Date)
    occupation = db.Column(db.String(255))
    contact_frequency = db.Column(db.String(50))
    contact_frequency_other = db.Column(db.String(255))
    contact_methods = db.Column(db.JSON)
    contact_method_other_explanation = db.Column(db.Text)
    expressed_interest_in_job = db.Column(db.Boolean)
    interest_in_job_explanation = db.Column(db.Text)
    foreign_gov_affiliation = db.Column(db.String(20))
    foreign_gov_affiliation_description = db.Column(db.Text)
    financial_material_emotional_ties = db.Column(db.Boolean)
    ties_description = db.Column(db.Text)
    marriage_date = db.Column(db.Date)
    cohabitation_start_date = db.Column(db.Date)
    remarks = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {c.name: (getattr(self, c.name).isoformat() if isinstance(getattr(self, c.name), (date, datetime)) else getattr(self, c.name)) for c in self.__table__.columns}


class Psq2ForeignAssociation(db.Model):
    __tablename__ = 'psq2_foreign_associations'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    submission_date = db.Column(db.Date, nullable=False)
    reported_to_security_officer = db.Column(db.Boolean)
    reported_date = db.Column(db.Date)
    reported_date_estimated = db.Column(db.Boolean, default=False)
    has_foreign_associations = db.Column(db.Boolean)
    foreign_national_name = db.Column(db.String(255))
    citizenship_countries = db.Column(db.String(255))
    country_of_residence = db.Column(db.String(255))
    how_long_known = db.Column(db.String(255))
    occupation = db.Column(db.String(255))
    relationship_to_nominee = db.Column(db.String(255))
    contact_frequency = db.Column(db.String(50))
    contact_frequency_other = db.Column(db.String(255))
    contact_methods = db.Column(db.JSON)
    contact_method_other_explanation = db.Column(db.Text)
    contact_types = db.Column(db.JSON)
    expressed_interest_in_job = db.Column(db.Boolean)
    interest_in_job_explanation = db.Column(db.Text)
    financial_material_emotional_ties = db.Column(db.Boolean)
    ties_description = db.Column(db.Text)
    foreign_gov_affiliation = db.Column(db.String(20))
    foreign_gov_affiliation_description = db.Column(db.Text)
    has_foreign_financial_interests = db.Column(db.Boolean)
    owns_foreign_real_estate = db.Column(db.Boolean)
    real_estate_country = db.Column(db.String(255))
    real_estate_type = db.Column(db.String(255))
    real_estate_acquired_date = db.Column(db.Date)
    real_estate_value = db.Column(db.Numeric(12, 2))
    real_estate_visit_frequency = db.Column(db.String(255))
    real_estate_has_co_owner = db.Column(db.Boolean)
    real_estate_co_owner = db.Column(db.String(255))
    real_estate_plans = db.Column(db.String(255))
    has_foreign_bank_account = db.Column(db.Boolean)
    bank_account_country = db.Column(db.String(255))
    bank_account_balance = db.Column(db.Numeric(12, 2))
    bank_account_purpose = db.Column(db.String(255))
    has_foreign_investment = db.Column(db.Boolean)
    foreign_investment_description = db.Column(db.Text)
    special_conditions_required = db.Column(db.Boolean)
    special_conditions_description = db.Column(db.Text)
    disposal_financial_hardship = db.Column(db.Boolean)
    disposal_hardship_explanation = db.Column(db.Text)
    remarks = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {c.name: (getattr(self, c.name).isoformat() if isinstance(getattr(self, c.name), (date, datetime)) else (float(getattr(self, c.name)) if getattr(self, c.name) is not None and c.type.__class__.__name__ == 'Numeric' else getattr(self, c.name))) for c in self.__table__.columns}


class Psq3ForeignTravel(db.Model):
    __tablename__ = 'psq3_foreign_travels'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    submission_date = db.Column(db.Date, nullable=False)
    reported_to_security_officer = db.Column(db.Boolean)
    reported_date = db.Column(db.Date)
    reported_date_estimated = db.Column(db.Boolean, default=False)
    purpose_code = db.Column(db.String(10))
    purpose_other_explanation = db.Column(db.String(255))
    travel_month_year = db.Column(db.String(20), nullable=False)
    number_of_days = db.Column(db.Integer, nullable=False)
    countries_and_cities = db.Column(db.Text, nullable=False)
    deviated_from_itinerary = db.Column(db.Boolean)
    deviation_explanation = db.Column(db.Text)
    questioned_or_detained = db.Column(db.Boolean)
    questioned_detained_explanation = db.Column(db.Text)
    police_or_security_encounter = db.Column(db.Boolean)
    police_encounter_explanation = db.Column(db.Text)
    contact_with_foreign_intelligence = db.Column(db.Boolean)
    foreign_intelligence_explanation = db.Column(db.Text)
    excessive_interest_in_job = db.Column(db.Boolean)
    excessive_interest_explanation = db.Column(db.Text)
    attempt_to_obtain_classified_info = db.Column(db.Boolean)
    classified_info_explanation = db.Column(db.Text)
    threatened_or_coerced = db.Column(db.Boolean)
    coercion_explanation = db.Column(db.Text)
    remarks = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {c.name: (getattr(self, c.name).isoformat() if isinstance(getattr(self, c.name), (date, datetime)) else getattr(self, c.name)) for c in self.__table__.columns}


class Psq4PersonalConduct(db.Model):
    __tablename__ = 'psq4_personal_conduct'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    submission_date = db.Column(db.Date, nullable=False)
    reported_to_security_officer = db.Column(db.Boolean)
    reported_date = db.Column(db.Date)
    reported_date_estimated = db.Column(db.Boolean, default=False)
    clearance_action_taken = db.Column(db.Boolean)
    suspension_date = db.Column(db.Date)
    denial_date = db.Column(db.Date)
    revocation_date = db.Column(db.Date)
    action_agency = db.Column(db.String(255))
    action_circumstances = db.Column(db.Text)
    arrested = db.Column(db.Boolean)
    offense_description = db.Column(db.Text)
    arrest_date = db.Column(db.Date)
    arrest_location = db.Column(db.String(255))
    involves_domestic_violence = db.Column(db.Boolean)
    involves_firearms_explosives = db.Column(db.Boolean)
    involves_alcohol_drugs = db.Column(db.Boolean)
    counseling_ordered = db.Column(db.Boolean)
    offense_disposition = db.Column(db.Text)
    court_requirements_completed = db.Column(db.Boolean)
    court_requirements_explanation = db.Column(db.Text)
    probation_start = db.Column(db.Date)
    probation_end = db.Column(db.Date)
    remarks = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {c.name: (getattr(self, c.name).isoformat() if isinstance(getattr(self, c.name), (date, datetime)) else getattr(self, c.name)) for c in self.__table__.columns}


class Psq5FinancialResponsibility(db.Model):
    __tablename__ = 'psq5_financial_responsibilities'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    submission_date = db.Column(db.Date, nullable=False)
    reported_to_security_officer = db.Column(db.Boolean)
    reported_date = db.Column(db.Date)
    reported_date_estimated = db.Column(db.Boolean, default=False)
    bills_in_collections = db.Column(db.Boolean)
    account_type = db.Column(db.String(255))
    account_name = db.Column(db.String(255))
    collection_amount = db.Column(db.Numeric(12, 2))
    property_type = db.Column(db.String(255))
    property_seized = db.Column(db.Boolean)
    financial_issue_start_date = db.Column(db.Date)
    financial_issue_resolved_date = db.Column(db.Date)
    settlement_amount = db.Column(db.Numeric(12, 2))
    collection_circumstances = db.Column(db.Text)
    repayment_plan = db.Column(db.Text)
    wages_garnished = db.Column(db.Boolean)
    garnishment_court_ordered_support = db.Column(db.Boolean)
    garnishment_circumstances = db.Column(db.Text)
    garnishment_start_date = db.Column(db.Date)
    garnishment_end_date = db.Column(db.Date)
    garnishment_amount = db.Column(db.Numeric(12, 2))
    garnishment_frequency = db.Column(db.String(255))
    has_tax_liens = db.Column(db.Boolean)
    tax_lien_reason = db.Column(db.String(50))
    tax_lien_reason_explanation = db.Column(db.Text)
    tax_lien_years = db.Column(db.String(255))
    tax_lien_agency = db.Column(db.String(255))
    tax_lien_amount = db.Column(db.Numeric(12, 2))
    tax_lien_type = db.Column(db.String(255))
    tax_lien_resolved_date = db.Column(db.Date)
    tax_lien_current_status = db.Column(db.Text)
    filed_bankruptcy = db.Column(db.Boolean)
    bankruptcy_type = db.Column(db.String(20))
    bankruptcy_filed_date = db.Column(db.Date)
    bankruptcy_discharged = db.Column(db.Boolean)
    bankruptcy_amount = db.Column(db.Numeric(12, 2))
    bankruptcy_court = db.Column(db.String(255))
    bankruptcy_reason = db.Column(db.Text)
    chapter13_plan_approved = db.Column(db.Boolean)
    chapter13_terms = db.Column(db.Text)
    bankruptcy_current_status = db.Column(db.Text)
    remarks = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {c.name: (getattr(self, c.name).isoformat() if isinstance(getattr(self, c.name), (date, datetime)) else (float(getattr(self, c.name)) if getattr(self, c.name) is not None and c.type.__class__.__name__ == 'Numeric' else getattr(self, c.name))) for c in self.__table__.columns}
