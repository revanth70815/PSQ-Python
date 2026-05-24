from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app import db
from app.models import (
    Psq1ForeignAffection, Psq2ForeignAssociation,
    Psq3ForeignTravel, Psq4PersonalConduct, Psq5FinancialResponsibility
)

psq_bp = Blueprint('psq', __name__)

PSQ_MAP = {
    'psq1': Psq1ForeignAffection,
    'psq2': Psq2ForeignAssociation,
    'psq3': Psq3ForeignTravel,
    'psq4': Psq4PersonalConduct,
    'psq5': Psq5FinancialResponsibility,
}


@psq_bp.post('/<psq_type>')
@login_required
def submit(psq_type):
    model = PSQ_MAP.get(psq_type)
    if not model:
        return jsonify({'error': 'Unknown PSQ type'}), 404
    data = request.get_json()
    data['user_id'] = current_user.id
    entry = model(**data)
    db.session.add(entry)
    db.session.commit()
    return jsonify(entry.to_dict()), 201


@psq_bp.get('/<psq_type>')
@login_required
def list_submissions(psq_type):
    model = PSQ_MAP.get(psq_type)
    if not model:
        return jsonify({'error': 'Unknown PSQ type'}), 404
    entries = model.query.filter_by(user_id=current_user.id).order_by(model.submission_date.desc()).all()
    return jsonify([e.to_dict() for e in entries])
